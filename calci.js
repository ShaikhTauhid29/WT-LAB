let displayValue = '0';
let waitingForSecondOperand = false;
let firstOperand = null;
let operator = null;
let lastButtonWasOperator = false;

function updateDisplay() {
    document.getElementById('display').textContent = displayValue;
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    lastButtonWasOperator = false;
    updateDisplay();
}

function appendDecimal() {
    if (lastButtonWasOperator) {
        displayValue = '0.';
        lastButtonWasOperator = false;
        waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation();
        displayValue = String(result);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = op;
    lastButtonWasOperator = true;
    updateDisplay();
}

function performCalculation() {
    const inputValue = parseFloat(displayValue);
    let result;
    
    switch (operator) {
        case '+':
            result = firstOperand + inputValue;
            break;
        case '-':
            result = firstOperand - inputValue;
            break;
        case '*':
            result = firstOperand * inputValue;
            break;
        case '/':
            result = firstOperand / inputValue;
            break;
        default:
            return inputValue;
    }
    
    return Math.round(result * 1000000) / 1000000; 
}

function calculate() {
    if (!operator) return;
    
    const inputValue = parseFloat(displayValue);
    const result = performCalculation();
    
    displayValue = String(result);
    firstOperand = result;
    operator = null;
    waitingForSecondOperand = false;
    lastButtonWasOperator = false;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    lastButtonWasOperator = false;
    updateDisplay();
}

updateDisplay();