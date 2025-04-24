let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const titleList = document.querySelectorAll(".content-title");
const titles = [];
const priceList = document.querySelectorAll(".content-price");
const prices = [];

// get all the titles from the store
titleList.forEach(title => {
    let text = title.textContent.trim();
    if (text !== ""){
        titles.push(text);
    } else {
        titles.push("unknown title");
        console.error(`Error: Unknown title variable. Value returned is: ${text}`);
    }
});

// get all the prices from the store
priceList.forEach(price => {
    let text = price.textContent.trim();
    text = text.replaceAll("Price: ",'').replaceAll("$",'');
    const priceValue = parseFloat(text).toFixed(2);
    if (priceValue > 0 && !isNaN(priceValue)) {
        prices.push(priceValue);
    } else {
        prices.push(0.00);
        console.error(`Error: Unknown price variable. Value returned is: ${priceValue}`);
    }
});

// add items to cart
function addToCart(id){
    let currentTitle = titles[id];
    let currentPrice = prices[id];

    let existingItem = cart.find(cartItem => id === cartItem.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({id,title:currentTitle,quantity:1,price:currentPrice});
    }

    // save updated cart to localStorage
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

// remove items from cart
function removeFromCart(id){
    cart = cart.filter(cartItem => id !== cartItem.id);
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

// clear the cart
function clearCart(){
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}

// display the cart items
function displayCart() {
    let table = document.getElementById("cart-items");
    table.innerHTML = "";
    let totalPrice = document.getElementById("total-price");
    let totalPriceValue = 0.00;
    let productItemCounter = document.getElementById("total-items");
    let productItemCounterValue = 0;
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>Title</td><td>Quantity</td><td>Rate</td><td colspan=\"2\">Amount</td>`;
    table.appendChild(tr);
    // display each cart item on a table with a "Remove" button
    cart.forEach(cartItem => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let productItemTitle = cartItem.title;
        let productItemPrice = cartItem.price;
        let productItemQuantity = cartItem.quantity;
        let productItemAmount = productItemQuantity * productItemPrice;
        tr.innerHTML = `<td>${productItemTitle}</td><td>${productItemQuantity}</td><td>${productItemPrice}</td><td>${productItemAmount}</td>`;

        // creating the remove button
        let btnRemoveFromCart = document.createElement("button");
        btnRemoveFromCart.textContent = "Remove";
        btnRemoveFromCart.onclick = function() {
            removeFromCart(cartItem.id); // remove this item
        };
        btnRemoveFromCart.classList.add("cart-button");
        td.appendChild(btnRemoveFromCart);
        tr.appendChild(td);
        table.appendChild(tr);

        // Add to Total Price
        totalPriceValue += productItemAmount;
        productItemCounterValue += 1;
    });
    // Update the Total Price Display
    totalPrice.textContent = totalPriceValue.toFixed(2);
    // Update the counter
    productItemCounter.innerText = `${productItemCounterValue}`;
}

// show or hide cart
function toggleCartVisibility(){
    let cartScroll = document.getElementById("scroll");
    let btnShowHideCart = document.getElementById("btnShowCartItems");
    let cartVisible = cartScroll.style.display
    if (cartVisible === "block"){
        cartScroll.style.display = "none";
        btnShowHideCart.innerText = "Show Cart Items";
    } else {
        cartScroll.style.display = "block";
        btnShowHideCart.innerHTML = "Hide Cart Items";
    }
}

function buyNow(id){
    let currentTitle = titles[id];
    let currentPrice = prices[id];
    if (cart == []){
        cart.push({id,title:currentTitle,quantity:1,price:currentPrice});
    } else {
        cart = [];
        cart.push({id,title:currentTitle,quantity:1,price:currentPrice});
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    window.location.href = "./payment/index.html";
}

// add to favorites
function addToFavorites(id) {
    let currentTitle = titles[id];
    let currentPrice = prices[id];
    // for each favorite entity, check whether the current title is equal to the one in favorite
    let existingFav = favorites.find(fav => fav.id === id);
    // if the favorite item exists
    if(existingFav){
        // notify the user
        console.log("Favorite item already added.");
    } else {
        // add to the cart
        favorites.push({id,title:currentTitle,quantity:1,price:currentPrice});
    }
    localStorage.setItem("favorites",JSON.stringify(favorites));
    displayFavorites();
};

// remove from favorites
function removeFromFavorites(currentTitle){
    favorites = favorites.filter(fav => fav.title !== currentTitle);
    localStorage.setItem("favorites",JSON.stringify(favorites));
    displayFavorites();
}

// display favorites
function displayFavorites(){
    let table = document.getElementById("favorites-table");
    table.innerHTML = "";
    let favoriteItemCounter = document.getElementById("favorites-count");
    let favoriteItemCounterValue = 0;
    favoriteItemCounter.innerText = `${favoriteItemCounterValue}`;
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>Title</td><td>Quantity</td><td>Rate</td><td colspan=\"2\">Amount</td>`;
    table.appendChild(tr);

    favorites.forEach(fav => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let title = fav.title;
        td.innerText = `${title}`;
        tr.appendChild(td);

        td = document.createElement("td");
        let quantity = fav.quantity;
        td.innerText = `${quantity}`;
        tr.appendChild(td);

        td = document.createElement("td");
        let price = fav.price;
        td.innerText = `${price}`;
        tr.appendChild(td);

        td = document.createElement("td");
        let amount = price * quantity;
        td.innerText = `${amount}`;
        tr.appendChild(td);
        
        td = document.createElement("td");
        let btnRemoveFavorite = document.createElement("button");
        btnRemoveFavorite.classList.add("favorites-button");
        btnRemoveFavorite.innerText = "Remove";
        btnRemoveFavorite.onclick = function(){
            removeFromFavorites(title);
        };
        td.appendChild(btnRemoveFavorite);
        tr.appendChild(td);

        table.appendChild(tr);
        favoriteItemCounterValue += 1;
        
    });
    favoriteItemCounter.innerText = `${favoriteItemCounterValue}`;
}

// add favorites to cart
function addFavoritesToCart(){
    cart = [];
    favorites.forEach(fav => {
        let id = fav.id;
        let title = fav.title;
        let quantity = fav.quantity;
        let price = fav.price;
        cart.push({id,title,quantity,price});
    });
    localStorage.setItem("cart",JSON.stringify(cart));
    localStorage.removeItem("favorites");
    favorites = [];
    displayCart();
    displayFavorites();
}

function addCartToFavorites(){
    favorites = [];
    cart.forEach(cartItem => {
        let id = cartItem.id;
        let title = cartItem.title;
        let quantity = cartItem.quantity;
        let price = cartItem.price;
        favorites.push({id,title,quantity,price});
    });
    localStorage.setItem("favorites",JSON.stringify(favorites));
    displayFavorites();
}

// toggle favorites
function toggleFavorites(){
    let favScroll = document.getElementById("favorites-scroll");
    let btnFavVisibilityToggle = document.getElementById("btnShowFavorites");
    let favScrollVisibility = favScroll.style.display;
    if (favScrollVisibility == "block"){
        favScroll.style.display = "none";
        btnFavVisibilityToggle.innerText = "Show Favorites";
    } else {
        favScroll.style.display = "block";
        btnFavVisibilityToggle.innerText = "Hide Favorites";
    }
}

document.addEventListener("DOMContentLoaded",function(){
    displayCart();
    displayFavorites();
});