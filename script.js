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
const eqBtn = document.querySelector('#btn-equals');

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
    if (displayStore['solved']) {
        delete displayStore['first'];
        delete displayStore['operator'];
        delete displayStore['second'];
        delete displayStore['solved'];
        expDisplay.textContent = '';
        reAddEventListener();
    } else {
        delete displayStore['first'];
        delete displayStore['operator'];
        delete displayStore['second'];
        updateDisplay();
    }
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

function add(one, two) {
    return one+two;
}

function subtract(one, two) {
    return one-two;
}

function multiply(one, two) {
    return one*two;
}

function divide(one, two) {
    return one/two;
}

function deleteEventListener() {
    numBtns.forEach(btn => btn.removeEventListener('click', () => inputNum(btn.value)));
    oprBtns.forEach(btn => btn.removeEventListener('click', () => inputOpr(btn.value)));
    dotBtn.removeEventListener('click', () => inputDotBtn());
    plusMinBtn.removeEventListener('click', () => togglePlusMin());
    bckspcBtn.removeEventListener('click', delChar);
    eqBtn.removeEventListener('click', () => calculate());
}

function reAddEventListener() {
    numBtns.forEach(btn => btn.addEventListener('click', () => inputNum(btn.value)));
    oprBtns.forEach(btn => btn.addEventListener('click', () => inputOpr(btn.value)));
    dotBtn.addEventListener('click', () => inputDotBtn());
    plusMinBtn.addEventListener('click', () => togglePlusMin());
    bckspcBtn.addEventListener('click', delChar);
    eqBtn.addEventListener('click', () => calculate());
}

function calculate() {
    if (eqDisplay.textContent == "") {
        expDisplay.textContent = "0";
        eqDisplay.textContent = "0";
        deleteEventListener();
    } else {
        if (displayStore['second']) {
            let result;
            let operator = displayStore['operator'];
            if (operator == "+") {
                result = add(parseFloat(displayStore['first']), parseFloat(displayStore['second']));
            } else if (operator == "-") {
                result = subtract(parseFloat(displayStore['first']), parseFloat(displayStore['second']));
            } else if (operator == "*") {
                result = multiply(parseFloat(displayStore['first']), parseFloat(displayStore['second']));
            } else {
                if (displayStore['first'] == "0" || displayStore['second'] == "0") {
                    msgBar.textContent = "Sorry, can't divide by zero or from zero!";
                    return;
                } else {
                    result = divide(parseFloat(displayStore['first']), parseFloat(displayStore['second']));
                }
            }
            expDisplay.textContent = `${displayStore['first']}${displayStore['operator']}${displayStore['second']}=`;
            eqDisplay.textContent = result;
            displayStore['solved'] = true;
            deleteEventListener();
        } else if (displayStore['operator']) {
            msgBar.textContent = "Sorry, a second number needs to be present!";
            return;
        } else {
            expDisplay.textContent = displayStore['first'];
            eqDisplay.textContent = displayStore['first'];
            for (key in displayStore) {
                if (key !== 'solved') { delete displayStore[key]; } else { continue; }
            }
            deleteEventListener();
        }
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
eqBtn.addEventListener('click', () => calculate());