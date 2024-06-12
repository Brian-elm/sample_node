function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}

function isEven(num) {
    return num % 2 === 0;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    isEven,
};
