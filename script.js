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

let displayStore = {};

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
    if (displayStore['operator']) {
        if (displayStore['second']) {
            displayStore['second'] += num;
            updateDisplay();
        } else {
            displayStore['second'] = num;
            updateDisplay();
        }
    } else if (displayStore['first']) {
        displayStore['first'] += num;
        updateDisplay();
    } else {
        displayStore['first'] = num;
        updateDisplay();
    }
}

function inputOpr(opr) {
    if (displayStore['operator']) {
        msgBar.textContent = 'An operator is already present!';
    } else {
        displayStore['operator'] = operator;
        updateDisplay();
    }
}

function clearDisplay() {
   eqDisplay.textContent = ''; 
}

function delChar() {
    eqDisplay.textContent = eqDisplay.textContent.slice(0, -1);
}

function updateDisplay() {
    if (displayStore['first']) {
        eqDisplay.textContent = displayStore['first'];
    } else {
        eqDisplay.textContent = '';
        return;
    }
    if (displayStore['operator']) {
        eqDisplay.textContent += displayStore['operator'];
    } else {
        return;
    }
    if (displayStore['second']) {
        eqDisplay.textContent += displayStore['second'];
    } else {
        return;
    }
}

numBtns.forEach(btn => btn.addEventListener('click', () => inputNum(btn.value)));
oprBtns.forEach(btn => btn.addEventListener('click', () => inputOpr(btn.value)));
clearBtn.addEventListener('click', clearDisplay);
bckspcBtn.addEventListener('click', delChar);