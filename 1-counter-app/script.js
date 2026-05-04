let count = 0;

// Select the elements we need
const display = document.getElementById('counter');
const btnInc = document.getElementById('incBtn');
const btnDec = document.getElementById('decBtn');
const btnReset = document.getElementById('resetBtn');

//  Increment function
btnInc.onclick = function () {
    count = count + 1;
    display.innerText = count;
}

//  Decrement function
btnDec.onclick = function () {
    count = count - 1;
    display.innerText = count;
}

//  Reset function
btnReset.onclick = function () {
    count = 0;
    display.innerText = count;
}
