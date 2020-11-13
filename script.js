// Initializing basic variables
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

// This object stores important data such as the first number, the second one, the operator, the answer and the boolean for solved
let displayStore = {};

// This function checks if space is available in the calculator to input more characters
function checkAvail() {
    if (displayStore['second']) {
        if (displayStore['second'].length < 7) {
            return true;
        } else {
            return false;
        }
    } else {
        if (displayStore['operator']) {
            return true;
        } else {
            if (displayStore['first']) {
                if (displayStore['first'].length < 7) {
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

// This function simply inputs a number (although it does not look as simple!)
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

// This function inputs an operator and checks if an operator is already present or not
function inputOpr(opr) {
    if (displayStore['operator']) {
        msgBar.textContent = 'An operator is already present!';
    } else {
        displayStore['operator'] = opr;
        updateDisplay();
    }
}

// This function clears the display when the clear button is clicked
function clearDisplay() {
    if (displayStore['solved'] == true) {
        delete displayStore['first'];
        delete displayStore['operator'];
        delete displayStore['second'];
        delete displayStore['solved'];
        expDisplay.textContent = '';
        reAddEventListener();
        updateDisplay();
    } else {
        delete displayStore['first'];
        delete displayStore['operator'];
        delete displayStore['second'];
        updateDisplay();
    }
}

// This function is used to implement the backspace feature in the application
function delChar() {
    if (displayStore['second']) {
        if (displayStore['second'].length == 1) {
            delete displayStore['second'];
            updateDisplay();
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

// This function adds a decimal button and checks for an existing one
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

// This function makes the number positive to negative or vice versa
function togglePlusMin() {
    if (displayStore['solved'] == true) {
        return;
    }
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

// The below functions simply operate on the numbers based on the operator present and rounds them
function add(one, two) {
    return Math.round(one+two);
}

function subtract(one, two) {
    return Math.round(one-two);
}

function multiply(one, two) {
    return Math.round(one*two);
}

function divide(one, two) {
    return Math.round(one/two);
}

// This function removes an already existing event listener and adds a new one except for the clear button
function deleteEventListener() {
    numBtns.forEach(btn => btn.removeEventListener('click', () => { return; }));
    oprBtns.forEach(btn => btn.removeEventListener('click', () => { return; }));
    dotBtn.removeEventListener('click', () => { return; });
    plusMinBtn.removeEventListener('click', () => { return; });
    bckspcBtn.removeEventListener('click', () => { return; });
    eqBtn.removeEventListener('click', () => { return; });
}

// This function 're'adds the event listeners to the buttons after the deleteEventListener function has been called
function reAddEventListener() {
    numBtns.forEach(btn => btn.removeEventListener('click', () => inputNum(btn.value)));
    oprBtns.forEach(btn => btn.removeEventListener('click', () => inputOpr(btn.value)));
    dotBtn.removeEventListener('click', () => inputDotBtn());
    plusMinBtn.removeEventListener('click', () => togglePlusMin());
    bckspcBtn.removeEventListener('click', () => delChar);
    eqBtn.removeEventListener('click', () => calculate());
}

// This large function does a lot of work like calling the basic operating functions
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

// This is a rather important function as it serves the deed of updating display by getting values from the displayStore object
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

// These are simple event listeners
numBtns.forEach(btn => btn.addEventListener('click', () => inputNum(btn.value)));
oprBtns.forEach(btn => btn.addEventListener('click', () => inputOpr(btn.value)));
dotBtn.addEventListener('click', () => inputDotBtn());
plusMinBtn.addEventListener('click', () => togglePlusMin());
clearBtn.addEventListener('click', clearDisplay);
bckspcBtn.addEventListener('click', delChar);
eqBtn.addEventListener('click', () => calculate());