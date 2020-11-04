const expDisplay = document.querySelector('#display-ops');
const eqDisplay = document.querySelector('#display-calc');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', function(e){alert(button.textContent)}));

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