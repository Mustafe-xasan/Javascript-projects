// simple calculator for my project
var currentInput = "0";
var firstNum = "";
var operator = "";

// update the screen
function showOnScreen() {
    document.getElementById("screen").innerHTML = currentInput;
}

// when numbers are clicked
function addNum(n) {
    // fix point logic
    if (n === ".") {
        if (currentInput.includes(".")) {
            return; // already has a dot
        }
    }

    if (currentInput === "0" && n !== ".") {
        currentInput = n;
    } else {
        currentInput = currentInput + n;
    }
    showOnScreen();
}


// when operators are clicked
function setOp(op) {
    firstNum = currentInput;
    operator = op;
    currentInput = "0";
}

// clear button
function clearAll() {
    currentInput = "0";
    firstNum = "";
    operator = "";
    showOnScreen();
}

// equals button
function calcResult() {
    var num1 = parseFloat(firstNum);
    var num2 = parseFloat(currentInput);
    var result = 0;

    if (operator === "+") {
        result = num1 + num2;
    }
    if (operator === "-") {
        result = num1 - num2;
    }
    if (operator === "*") {
        result = num1 * num2;
    }
    if (operator === "/") {
        if (num2 === 0) {
            alert("Error: zero divide!");
            return;
        }
        result = num1 / num2;
    }

    currentInput = result.toString();

    // if result is too long, round it
    if (currentInput.length > 10) {
        currentInput = result.toPrecision(10).toString();
    }

    showOnScreen();
}


