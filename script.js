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
    operatorExists: false,
    decimalUsed: false,
    answerReceived: false
};

function checkAvail() {
    if (displayStore['operatorExists']) {
        if (displayStore['second'] == null) {
            return true;
        } else {
            if (displayStore['second'].length <= 5) {
                return false;
            } else {
                return true;
            }
        }
    } else {
        if (displayStore['first'] == null) {
            return true;
        } else {
            if (displayStore['first'].length <= 5) {
                return false;
            } else {
                return true;
            }
        }
    }
}

function inputNum(num) {
    if (checkAvail() == true) {
        if (displayStore['operatorExists']) {
            eqDisplay.textContent += num;
            displayStore['second'] = eqDisplay.textContent;
            displayStore['secondExists'] = true;
        } else {
            eqDisplay.textContent += num;
            displayStore['first'] = eqDisplay.textContent;
            displayStore['firstExists'] = true;
        }
    } else {
        msgBar.textContent = 'Length is too long for the calculator to hold';
    }
}

function inputOpr(opr) {
    if (displayStore['operatorExists']) {
        msgBar.textContent = 'An operator is already present!';
    } else {
        eqDisplay.textContent += opr;
        displayStore['operatorExists'] = true;
        displayStore['operator'] = opr
    }
}

function clearDisplay() {
   eqDisplay.textContent = ""; 
}

function delChar() {
    eqDisplay.textContent = eqDisplay.textContent.slice(0, -1);
}

numBtns.forEach(btn => btn.addEventListener('click', () => inputNum(btn.value)));
oprBtns.forEach(btn => btn.addEventListener('click', () => inputOpr(btn.value)));
clearBtn.addEventListener('click', clearDisplay);
bckspcBtn.addEventListener('click', delChar);