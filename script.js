const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

buttons.addEventListener('click', (e) => {
    const button = e.target;
    const action = button.dataset.action;
    const buttonContent = button.textContent;

    if (!button.matches('button')) {
        return;
    }

    if (action === 'number') {
        handleNumber(buttonContent);
        updateDisplay();
    }

    if (action === 'operator') {
        handleOperator(buttonContent);
        updateDisplay();
    }

    if (action === 'decimal') {
        handleDecimal();
        updateDisplay();
    }

    if (action === 'clear') {
        clearAll();
        updateDisplay();
    }

    if (action === 'clear-entry') {
        clearEntry();
        updateDisplay();
    }

    if (action === 'backspace') {
        handleBackspace();
        updateDisplay();
    }

    if (action === 'calculate') {
        handleEquals();
        updateDisplay();
    }
});

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && shouldResetDisplay)  {
        operator = nextOperator;
        return;
    }

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const result = calculate(previousInput, inputValue, operator);
        currentInput = `${parseFloat(result.toFixed(7))}`;
        previousInput = result;
    }

    shouldResetDisplay = true;
    operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') return firstOperand + secondOperand;
    if (operator === '-') return firstOperand - secondOperand;
    if (operator === '*') return firstOperand * secondOperand;
    if (operator === '/') return firstOperand / secondOperand;
    return secondOperand;
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clearAll() {
    currentInput = '0';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
}

function clearEntry() {
    currentInput = '0';
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
}

function handleEquals() {
    if (!operator || previousInput === '') return;
    const secondOperand = parseFloat(currentInput);
    const result = calculate(previousInput, secondOperand, operator);
    currentInput = `${parseFloat(result.toFixed(7))}`;
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
}

updateDisplay();
