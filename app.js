const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';


function updateScreen(value) {
    screen.value = value;
}

function calculate() {
    if (previousInput !== '' && currentInput !== '') {
        switch (operator) {
            case '+':
                currentInput = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                currentInput = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                currentInput = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case '/':
                if (parseFloat(currentInput) === 0) {
                    currentInput = 'Error'; 
                } else {
                    currentInput = parseFloat(previousInput) / parseFloat(currentInput);
                }
                break;
            case '%':
                currentInput = (parseFloat(previousInput) % parseFloat(currentInput));
                break;
            default:
                break;
        }
        updateScreen(currentInput);
        previousInput = '';
        operator = '';
    }
}


function handleButtonClick(event) {
    const value = event.target.textContent;

    if (value === 'C') {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateScreen('0');
    } else if (value === 'DEL') {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateScreen(currentInput || '0');
        }
    } else if (value === '=') {
        calculate();
    } else if (value === '.' && !currentInput.includes('.')) {
        currentInput += value;
        updateScreen(currentInput);
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (currentInput !== '') {
            previousInput = currentInput;
            currentInput = '';
            operator = value;
        }
    } else {
        currentInput += value;
        updateScreen(currentInput);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
