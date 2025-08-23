const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let operator = null;
let firstOperand = null;

function updateDisplay() {
  display.textContent = currentInput;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.id === "clear") {
      currentInput = "0";
      operator = null;
      firstOperand = null;
      updateDisplay();
      return;
    }

    if (button.id === "equals") {
      if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
          case "+": currentInput = (firstOperand + secondOperand).toString(); break;
          case "-": currentInput = (firstOperand - secondOperand).toString(); break;
          case "*": currentInput = (firstOperand * secondOperand).toString(); break;
          case "/": currentInput = secondOperand !== 0 ? (firstOperand / secondOperand).toString() : "Error"; break;
          default: break;
        }
        operator = null;
        firstOperand = null;
        updateDisplay();
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      operator = value;
      firstOperand = parseFloat(currentInput);
      currentInput = "0";
      return;
    }

    if (button.id === "decimal") {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
      }
      return;
    }

    if (!isNaN(value)) {
      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
      updateDisplay();
    }
  });
});

updateDisplay();