let amountBox = document.getElementById("amount");
let fromBox = document.getElementById("from-currency");
let toBox = document.getElementById("to-currency");
let resultBox = document.getElementById("result-text");
let infoBox = document.getElementById("conversion-text");

async function startApp() {
    let response = await fetch("https://api.frankfurter.app/currencies");
    let list = await response.json();

    let html = "";
    for (let code in list) {
        html = html + "<option value='" + code + "'>" + code + " - " + list[code] + "</option>";
    }
    fromBox.innerHTML = html;
    toBox.innerHTML = html;

    
    fromBox.value = "USD";
    toBox.value = "EUR";


    doMatching();
}

// 3. This does the money calculation
async function doMatching() {
    let money = amountBox.value;
    let from = fromBox.value;
    let to = toBox.value;

    // Stop if there is no money entered
    if (money <= 0) {
        resultBox.innerText = "0.00";
        return;
    }

    if (from == to) {
        resultBox.innerText = money;
        infoBox.innerText = "Same currency";
        return;
    }

    infoBox.innerText = "Talking to the bank...";

    // Ask the internet for the latest price
    let url = "https://api.frankfurter.app/latest?amount=" + money + "&from=" + from + "&to=" + to;
    let response = await fetch(url);
    let result = await response.json();

    resultBox.innerText = result.rates[to].toFixed(2);
    infoBox.innerText = "1 " + from + " is worth " + (result.rates[to] / money).toFixed(4) + " " + to;
}

amountBox.oninput = doMatching;
fromBox.onchange = doMatching;
toBox.onchange = doMatching;


startApp();
