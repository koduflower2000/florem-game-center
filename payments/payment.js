const checkout = JSON.parse(localStorage.getItem("cart")) || [];
const theForm = document.getElementById("user-details");

function displayItemsAtCheckout(){
    let checkoutTable = document.getElementById("checkout-items");
    let totalPrice = document.getElementById("total-price");
    let totalPriceValue = 0.00;
    let checkoutItemCounter = document.getElementById("total-items");
    let checkoutItemCounterValue = 0;
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>Title</td><td>Quantity</td><td>Price</td><td colspan=\"2\">Amount</td>`;
    thead.appendChild(tr);
    checkoutTable.appendChild(thead);
    checkout.forEach(checkoutItem => {
        let productTitle = checkoutItem.title;
        let productPrice = checkoutItem.price;
        let productQuantity = checkoutItem.quantity;
        let productAmount = productPrice * productQuantity;
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${productTitle}</td><td>${productPrice}</td><td>${productQuantity}</td><td>${productAmount}</td>`;
        checkoutTable.appendChild(tr);

        totalPriceValue += productAmount;
        checkoutItemCounterValue += 1;
    });
    checkoutItemCounter.innerText = `${checkoutItemCounterValue}`;
    totalPrice.textContent = totalPriceValue.toFixed(2);
}

theForm.addEventListener("submit",function(e){
    if (theForm.checkValidity()){
        e.preventDefault();
        let totalPrice = document.getElementById("total-price");
        let totalPriceValue = parseFloat(totalPrice.innerText).toFixed(2);
        let defaultFontFamily = "\"Space Grotesk\", \"Franklin Gothic Medium\", sans-serif";
        let defaultPaddingAndGap = "10px";
        
        let mainWebpage = document.querySelector("main");
        let darkeningScreen = document.createElement("div");
        darkeningScreen.style.position = "fixed";
        darkeningScreen.style.backgroundColor = "#00000080";
        darkeningScreen.style.width = "100vw";
        darkeningScreen.style.height = "100vh";
        darkeningScreen.style.left = "0px";
        darkeningScreen.style.top = "0px";
        darkeningScreen.style.display = "flex";
        darkeningScreen.style.flexFlow = "column wrap";
        darkeningScreen.style.justifyContent = "center";
        darkeningScreen.style.padding = "auto";
        
        let noticePopUp = document.createElement("div");
        noticePopUp.style.position = "static";
        noticePopUp.style.backgroundColor = "#000000";
        noticePopUp.style.display = "grid";
        noticePopUp.style.gridTemplateColumns = "repeat(2,1fr)";
        noticePopUp.style.gridTemplateRows = "repeat(3,auto)";
        noticePopUp.style.justifyContent = "center";
        noticePopUp.style.padding = `${defaultPaddingAndGap}`;
        noticePopUp.style.margin = "0 auto";
        noticePopUp.style.gap = `${defaultPaddingAndGap}`;
        noticePopUp.style.border = "2px solid #c080ff";
        noticePopUp.style.borderRadius = `${defaultPaddingAndGap}`;

        let bigThankYouText = document.createElement("div");
        bigThankYouText.style.gridColumn = "1/span 2";
        bigThankYouText.style.gridRow = "1";
        bigThankYouText.style.fontFamily = `${defaultFontFamily}`;
        bigThankYouText.style.fontSize = "128px";
        bigThankYouText.style.fontWeight = "300";
        bigThankYouText.style.color = "#ffffff";
        bigThankYouText.style.textAlign = "center";
        bigThankYouText.style.display = "block";
        bigThankYouText.style.padding = `${defaultPaddingAndGap}`;
        bigThankYouText.innerText = "Thank You!";
        noticePopUp.appendChild(bigThankYouText);

        let smallThankYouText = document.createElement("div");
        smallThankYouText.style.gridColumn = "1/span 2";
        smallThankYouText.style.gridRow = "2";
        smallThankYouText.style.fontFamily = `${defaultFontFamily}`;
        smallThankYouText.style.fontSize = "16px";
        smallThankYouText.style.textAlign = "center";
        smallThankYouText.style.display = "block";
        smallThankYouText.style.padding = `${defaultPaddingAndGap}`;
        smallThankYouText.innerText = "Thank you for purchasing! Have a nice day.";
        noticePopUp.appendChild(smallThankYouText);

        let paymentInfo = document.createElement("div");
        let currentDateTime = new Date();
        let currentDate = currentDateTime.toISOString().split("T")[0];
        let currentTime = currentDateTime.toISOString().split("T")[1];
        currentTime = currentTime.split(".")[0];
        paymentInfo.style.gridColumn = "1";
        paymentInfo.style.gridRow = "3";
        paymentInfo.style.fontFamily = `${defaultFontFamily}`;
        paymentInfo.style.fontSize = "16px";
        paymentInfo.style.textAlign = "center";
        paymentInfo.style.display = "block";
        paymentInfo.style.padding = `${defaultPaddingAndGap}`;
        paymentInfo.innerText = `Purchase Date: ${currentDate} at ${currentTime} GMT`;
        noticePopUp.appendChild(paymentInfo);

        let noticePrice = document.createElement("div");
        noticePrice.style.gridColumn = "2";
        noticePrice.style.gridRow = "3";
        noticePrice.style.fontFamily = `${defaultFontFamily}`;
        noticePrice.style.fontSize = "16px";
        noticePrice.style.textAlign = "center";
        noticePrice.style.display = "block";
        noticePrice.style.padding = `${defaultPaddingAndGap}`;
        noticePrice.innerText = `Total Price: ${totalPriceValue}`;
        noticePopUp.appendChild(noticePrice);

        darkeningScreen.appendChild(noticePopUp);
        mainWebpage.appendChild(darkeningScreen);
        /* window.location.href="../index.html"; */
    }
});

document.addEventListener("DOMContentLoaded",displayItemsAtCheckout());