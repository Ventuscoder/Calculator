const expDisplay = document.querySelector('#display-ops');
const eqDisplay = document.querySelector('#display-calc');
const buttons = document.querySelectorAll('button');
const numBtns = document.querySelectorAll('.btn-number');
const oprBtns = document.querySelectorAll('.btn-operator');
const clearBtn = document.querySelector('#btn-clear');
const plusMinBtn = document.querySelector('#btn-plus-min');
const bckspcBtn = document.querySelector('#btn-back');
const dotBtn = document.querySelector('#btn-dot');
const msgBar = document.querySelector('.msg');

let displayStore = {
    first: null,
    second: null,
    operator: null,
    answer: null,
    firstExists: false,
    secondExists: false,
    decimalUsed: false,
    answerReceived: false
};

function inputNum(num){
    eqDisplay.textContent += num;
}

function clearDisplay() {
   eqDisplay.textContent = ""; 
}

numBtns.forEach(btn => btn.addEventListener('click', () => eqDisplay.textContent.length <= 14 ? inputNum(btn.value) : msgBar.textContent = "Length cannot exceed 15 characters!"));
clearBtn.addEventListener('click', clearDisplay);