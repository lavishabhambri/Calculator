// applying DOM and fetching buttons
var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");

// declaring variables
var operand1 = 0;
var operand2 = null;
var operator = null; // This stores the current operation

// checks whether an element is an operator or not
function isOperator(value) {
  return value == "+" || value == "-" || value == "*" || value == "/";
}

// Handling clicks on all the buttons
for (var i = 0; i < buttons.length; i++) {
  // extracting ith button and adding on-click listener
  buttons[i].addEventListener('click', function() {

    // To know which button is clicked - either numeric, equal or operator
    var value = this.getAttribute('data-value'); // this - current button
    var text = display.textContent.trim(); // gives the text(string) of the display

    // If the value is an operator
    if (isOperator(value)) {
      operator = value;
      operand1 = parseFloat(text);
      display.textContent = "";
    }
    else if (value == "ac") { // Value id ac, so we need to clear
      display.textContent = "";
    }
    else if (value == "sign") { // value can be +, -, * or /, fetch the 1st operand
      operand1 = parseFloat(text); // parsing the text gives number
      operand1 = -1 * operand1;
      display.textContent = operand1; // Now display contains operand1
    }
    else if (value == ".") {
      if (text.length && !text.includes('.')) {
        display.textContent = text + '.'; // for floating no.s
      }
    }
    else if (value == "%") { // value - returns percentage out of 100
      operand1 = parseFloat(text);
      operand1 = operand1 / 100;
      display.textContent = operand1
    }
    else if (value == "=") { // value - equal, so we need to get the 2nd operand now and display the results
      operand2 = parseFloat(text);
      var result = eval(operand1 + ' ' + operator + ' ' + operand2); // eval gives the result
      if (result) {
        display.textContent = result; // showing the result on display
        operand1 = result; // assign the result value in operand1
        operand2 = null; // reassign the values
        operator = null; // reassign the values
      }
    }
    else { // This appends the value to it, in case of values with length > 1, ex- 7777
      display.textContent += value;
    }
  });
}
