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
    if (displayStore['second']) {
        if (displayStore['second'].length < 8) {
            return true;
        } else {
            return false;
        }
    } else {
        if (displayStore['operator']) {
            return true;
        } else {
            if (displayStore['first']) {
                if (displayStore['first'].length < 8) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }
}

function inputNum(num) {
    if (checkAvail() == true) {
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
    } else {
        msgBar.textContent = 'Sorry the number of characters given has crossed the limit!';
    }
}

function inputOpr(opr) {
    if (displayStore['operator']) {
        msgBar.textContent = 'An operator is already present!';
    } else {
        displayStore['operator'] = opr;
        updateDisplay();
    }
}

function clearDisplay() {
   delete displayStore['first'];
   delete displayStore['operator'];
   delete displayStore['second'];
   updateDisplay();
}

function delChar() {
    if (displayStore['second']) {
        if (displayStore['second'].length == 1) {
            delete displayStore['second'];
        } else {
            displayStore['second'] = displayStore['second'].slice(0, -1);
            updateDisplay();   
        }
    } else {
        if (displayStore['operator']) {
            delete displayStore['operator'];
            updateDisplay();
        } else {
            if (displayStore['first']) {
                if (displayStore['first'].length == 1) {
                    delete displayStore['first'];
                } else {
                    displayStore['first'] = displayStore['first'].slice(0, -1);
                    updateDisplay();   
                }
            } else {
                return;
            }
        }
    }
}

function inputDotBtn() {
    if (checkAvail() == true) {
        if (displayStore['second']) {
            if (displayStore['second'].includes(".")) {
                msgBar.textContent = 'Sorry, a decimal point already exists!';
            } else {
                displayStore['second'] += '.';
                updateDisplay();
            }
        } else if (displayStore['operator']) {
            displayStore['second'] = "0.";
            updateDisplay();
        } else if (displayStore['first']) {
            if (displayStore['first'].includes(".")) {
                msgBar.textContent = 'Sorry, a decimal point already exists!';
            } else {
                displayStore['first'] += '.';
                updateDisplay();
            }
        } else {
            displayStore['first'] = '0.';
            updateDisplay();
        }
    } else {
        msgBar.textContent = 'Sorry the number of characters given has crossed the limit!';
    }
}

function togglePlusMin() {
    if (checkAvail() == true) {
        if (displayStore['second']) {
            if (displayStore['second'].includes("-")) {
                displayStore['second'] = displayStore['second'].substring(1);
                updateDisplay();
            } else {
                displayStore['second'] = `-${displayStore['second']}`;
                updateDisplay();
            }
        } else if (displayStore['operator']) {
            displayStore['second'] = '-0';
            updateDisplay();
        } else if (displayStore['first']) {
            if (displayStore['first'].includes("-")) {
                displayStore['first'] = displayStore['first'].substring(1);
                updateDisplay();
            } else {
                displayStore['first'] = `-${displayStore['first']}`;
                updateDisplay();
            }
        } else {
            displayStore['first'] = '-0';
            updateDisplay();
        }
    } else {
        msgBar.textContent = 'Sorry the number of characters given has crossed the limit!';
    }
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
dotBtn.addEventListener('click', () => inputDotBtn());
plusMinBtn.addEventListener('click', () => togglePlusMin());
clearBtn.addEventListener('click', clearDisplay);
bckspcBtn.addEventListener('click', delChar);