const myInputBox = document.getElementById("password-display");
const btnCopy = document.getElementById("copy-btn");
const mySlider = document.getElementById("length-slider");
const numberShow = document.getElementById("length-val");
const check1 = document.getElementById("numbers");
const check2 = document.getElementById("symbols");
const btnGenerate = document.getElementById("generate-btn");

// Lists of letters
const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const syms = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

mySlider.addEventListener('input', () => {
    numberShow.innerHTML = mySlider.value;
});

// GENERATE FUNCTION
const generate = () => {
    let chars = abc;

    if (check1.checked) {
        chars = chars + nums;
    }

    if (check2.checked) {
        chars = chars + syms;
    }

    let pass = "";
    const len = mySlider.value;

    for (let i = 0; i < len; i++) {
        const r = Math.floor(Math.random() * chars.length);
        pass = pass + chars[r];
    }

    myInputBox.value = pass;
};

const copyIt = () => {
    const text = myInputBox.value;

    if (text === "") {
        alert("Make a password first!");
    } else {
        navigator.clipboard.writeText(text);
        alert("Copied!");
    }
};

btnGenerate.addEventListener('click', generate);
btnCopy.addEventListener('click', copyIt);


window.addEventListener('load', generate);
