const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.addEventListener('click', (e) => {
    const buttonValue = e.target.innerText;

    if (e.target.matches('button')) {
        if (
            buttonValue === '+' ||
            buttonValue === '-' ||
            buttonValue === '*' ||
            buttonValue === '/' ||
            buttonValue === '%'
        ) {
            handleOperator(buttonValue);
        } else if (buttonValue === '=') {
            handleEquals();
        } else if (buttonValue === 'C') {
            clearAll();
        } else if (buttonValue === 'CE') {
            clearEntry();
        } else {
            handleNumber(buttonValue);
        }
    }
});

function handleNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        handleEquals();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function handleEquals() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function clearAll() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

function clearEntry() {
    currentInput = '';
    updateDisplay('0');
}

function updateDisplay(value) {
    display.innerText = value;
}
