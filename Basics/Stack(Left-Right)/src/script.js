class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
        this.updateSmallWindow();
    }

    pop() {
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    visualize(stackElementId) {
        const stackElement = document.getElementById(stackElementId);
        stackElement.innerHTML = "";
        this.items.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.className = "stack-item";
            itemElement.innerText = item;
            stackElement.appendChild(itemElement);
        });
    }

    updateSmallWindow() {
        const topItem = this.items.length > 0 ? this.items[this.items.length - 1] : '';
        const websiteFrame = document.getElementById("websiteFrame");

        if (isUrl(topItem)) {
            websiteFrame.src = topItem;
        } else {
            websiteFrame.src = "";
        }
    }
}

const leftStack = new Stack();
const rightStack = new Stack();

function pushToLeftStack() {
    const value = prompt("Enter a value (website URL) to push to the left stack:");
    if (value !== null && value.trim() !== "") {
        leftStack.push(value.trim());
        leftStack.visualize("leftStack");
        highlightArrow("leftArrow");
    }
}

function popFromLeftStack() {
    if (!leftStack.isEmpty()) {
        leftStack.pop();
        leftStack.visualize("leftStack");
        leftStack.updateSmallWindow();
    } else {
        alert("Left stack is empty!");
        clearSmallWindow();
    }
}

function moveLeftToRight() {
    if (!leftStack.isEmpty()) {
        const value = leftStack.pop();
        rightStack.push(value);
        leftStack.visualize("leftStack");
        rightStack.visualize("rightStack");
        highlightArrow("rightArrow");
        leftStack.updateSmallWindow();
    } else {
        alert("Left stack is empty!");
        clearSmallWindow();
    }
}

function moveRightToLeft() {
    if (!rightStack.isEmpty()) {
        const value = rightStack.pop();
        leftStack.push(value);
        rightStack.visualize("rightStack");
        leftStack.visualize("leftStack");
        highlightArrow("leftArrow");
        leftStack.updateSmallWindow();
    } else {
        alert("Right stack is empty!");
        clearSmallWindow();
    }
}

function highlightArrow(arrowId) {
    const arrows = document.querySelectorAll(".arrow");
    arrows.forEach(arrow => arrow.classList.remove("highlight"));
    document.getElementById(arrowId).classList.add("highlight");
}

function isUrl(str) {
    // Simple check for URL format
    return /^(http|https):\/\//.test(str);
}

function clearSmallWindow() {
    const websiteFrame = document.getElementById("websiteFrame");
    websiteFrame.src = "";
}