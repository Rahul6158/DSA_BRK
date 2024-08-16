let speed = 1000;

function updateSpeed(value) {
    speed = value;
    document.getElementById('speedValue').innerText = `${value}ms`;
}

function getPrecedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    if (op === '^') return 3;
    return 0;
}

function isOperator(c) {
    return ['+', '-', '*', '/', '^'].includes(c);
}

async function convertToPostfix() {
    const infix = document.getElementById('infixInput').value;
    const outputElement = document.getElementById('postfixOutput');
    const stepsElement = document.getElementById('steps');
    const operatorStackElement = document.getElementById('operatorStack');
    const postfixStringElement = document.getElementById('postfixString');
    let stack = [];
    let postfix = '';

    stepsElement.innerHTML = '';
    operatorStackElement.innerHTML = '';
    postfixStringElement.innerHTML = '';

    for (let char of infix) {
        if (/[a-zA-Z0-9]/.test(char)) {
            postfix += char;
            stepsElement.innerHTML += `<p>Operand ${char} added to postfix expression</p>`;
        } else if (char === '(') {
            stack.push(char);
            stepsElement.innerHTML += `<p>Left parenthesis ${char} pushed to stack</p>`;
        } else if (char === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
                stepsElement.innerHTML += `<p>Operator popped from stack and added to postfix expression</p>`;
            }
            stack.pop(); // Remove the left parenthesis
            stepsElement.innerHTML += `<p>Left parenthesis removed from stack</p>`;
        } else if (isOperator(char)) {
            while (stack.length > 0 && getPrecedence(stack[stack.length - 1]) >= getPrecedence(char)) {
                postfix += stack.pop();
                stepsElement.innerHTML += `<p>Operator popped from stack and added to postfix expression</p>`;
            }
            stack.push(char);
            stepsElement.innerHTML += `<p>Operator ${char} pushed to stack</p>`;
        }
        updateVisualization(stack, postfix);
        await sleep(speed); // Pause to visualize each step
    }

    while (stack.length > 0) {
        postfix += stack.pop();
        stepsElement.innerHTML += `<p>Operator popped from stack and added to postfix expression</p>`;
        updateVisualization(stack, postfix);
        await sleep(speed); // Pause to visualize each step
    }

    outputElement.value = postfix;
}

function updateVisualization(stack, postfix) {
    const operatorStackElement = document.getElementById('operatorStack');
    const postfixStringElement = document.getElementById('postfixString');

    operatorStackElement.innerHTML = '';
    postfixStringElement.innerHTML = '';

    stack.forEach(item => {
        const element = document.createElement('div');
        element.className = 'stack-item';
        element.textContent = item;
        operatorStackElement.appendChild(element);
    });

    postfix.split('').forEach(item => {
        const element = document.createElement('div');
        element.className = 'stack-item';
        element.textContent = item;
        postfixStringElement.appendChild(element);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
