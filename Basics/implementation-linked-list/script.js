class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
        this.memoryAddress = this.generateMemoryAddress();
    }

    generateMemoryAddress() {
        return Math.floor(Math.random() * 9000) + 1000; // Generates a random 4-digit number
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.headAddress = "null";
    }

    push(value) {
        const newNode = new Node(value, this.top);
        this.headAddress = newNode.memoryAddress;
        this.top = newNode;
        this.draw();
    }

    pop() {
        if (!this.top) {
            alert("Stack is empty");
            return;
        }
        this.headAddress = this.top.next ? this.top.next.memoryAddress : "null";
        this.top = this.top.next;
        this.draw();
    }

    draw() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw head box
    ctx.beginPath();
    ctx.rect(20, 20, 100, 30);
    ctx.fillStyle = '#FF6F61';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(this.headAddress, 50, 40);

    let currentNode = this.top;
    let x = 150;
    let y = 100;
    let count = 0; // Track the number of nodes in the current row
    const maxNodesPerRow = 3; // Max nodes per row before wrapping

    while (currentNode) {
        // Draw value block
        ctx.beginPath();
        ctx.rect(x, y, 100, 50); // Value block
        ctx.fillStyle = '#4285F4';
        ctx.fill();
        ctx.stroke();

        // Draw the value
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(currentNode.value, x + 10, y + 30);

        // Draw the address block next to the value block
        ctx.beginPath();
        ctx.rect(x + 100, y, 100, 50); // Address block
        ctx.fillStyle = '#34A853';
        ctx.fill();
        ctx.stroke();

        // Draw the pointer (next node's address)
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(currentNode.next ? currentNode.next.memoryAddress : "null", x + 110, y + 30);

        // Draw the memory address above the value block
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.fillText(currentNode.memoryAddress, x + 10, y - 10);

        // Handle arrows based on row wrapping
        if (currentNode.next) {
            if (count % maxNodesPerRow === maxNodesPerRow - 1) { // Last node in the current row
                // Draw downward arrow
                ctx.beginPath();
                ctx.moveTo(x + 200, y + 25); // Right edge of the last block
                ctx.lineTo(x + 200, y + 75); // Move straight down
                ctx.stroke();

// Draw horizontal arrow linking to the first node in the next row
ctx.beginPath();
ctx.moveTo(x + 200, y + 75); // Start from the bottom of the downward arrow
ctx.lineTo(150, y + 75); // Move horizontally to the left to align with the next row
ctx.stroke();

// Draw vertical line connecting to the arrowhead
ctx.beginPath();
ctx.moveTo(150, y + 75); // End of the horizontal line
ctx.lineTo(150, y + 125); // Move straight down to the next node's row
ctx.stroke();

// Draw line connecting to the next node
ctx.beginPath();
ctx.moveTo(150, y + 125); // Start from the end of the vertical line
ctx.lineTo(150, y + 175); // Move vertically to align with the next node
ctx.stroke();

// Draw arrowhead pointing to the next node
ctx.beginPath();
ctx.moveTo(140, y + 175); // Start of the arrowhead
ctx.lineTo(150, y + 175); // Arrow pointing right to the next node
ctx.lineTo(140, y + 185); // Complete arrowhead
ctx.fill();




            } else {
                // Draw horizontal arrow connecting nodes in the same row
                ctx.beginPath();
                ctx.moveTo(x + 200, y + 25);
                ctx.lineTo(x + 250, y + 25);
                ctx.stroke();

                // Draw arrowhead pointing right
                ctx.beginPath();
                ctx.moveTo(x + 240, y + 20);
                ctx.lineTo(x + 250, y + 25);
                ctx.lineTo(x + 240, y + 30);
                ctx.fill();
            }
        }

        // Update the x-coordinate and count
        x += 250;
        count++;

        // Move to the next line after 3 nodes
        if (count % maxNodesPerRow === 0) {
            x = 150; // Reset x to the starting position
            y += 150; // Move y down for the next line
        }

        currentNode = currentNode.next;
    }
}
 
}

const stack = new Stack();

function init() {
    stack.draw();
}

function push() {
    const value = prompt("Enter a value to push:");
    if (value !== null && value !== "") {
        stack.push(value);
    }
}

function pop() {
    stack.pop();
}