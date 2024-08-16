let stack = [];

function push() {
  let value = prompt("Enter a value to push:");
  if (value !== null && value !== "") {
    stack.push(value);
    displayStack();
  }
}

function pop() {
  if (stack.length === 0) {
    alert("Stack is empty!");
  } else {
    stack.pop();
    displayStack();
  }
}

function displayStack() {
  let stackElement = document.getElementById("stack");
  stackElement.innerHTML = "";
  stack.forEach(item => {
    let div = document.createElement("div");
    div.textContent = item;
    stackElement.appendChild(div);
  });
}
