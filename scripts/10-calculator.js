// Initialize the calculation variable
let calculation = '';

function addToCalculation(value) {
  calculation += value;
  document.getElementById('display').innerText = calculation;
}

function calculateResult() {
  try {
    calculation = eval(calculation);
    document.getElementById('display').innerText = calculation;
  } catch (e) {
    document.getElementById('display').innerText = 'Error';
    calculation = '';
  }
}

function clearCalculation() {
  calculation = '';
  document.getElementById('display').innerText = '';
}