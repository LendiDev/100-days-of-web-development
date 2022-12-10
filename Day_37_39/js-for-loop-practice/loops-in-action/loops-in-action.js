// First Example: Sum numbers

const calculateSumButtonElement = document.querySelector('#calculator button');

function calculateSum() {
  const userNumberInputElement = document.getElementById('user-number');
  const enteredNumber = userNumberInputElement.value;

  let sumUpToNumber = 0;

  for (let i = 0; i <= enteredNumber; i++) {
    sumUpToNumber = sumUpToNumber + i;
  }

  const outputResultElement = document.getElementById('calculated-sum');

  outputResultElement.textContent = sumUpToNumber;
  outputResultElement.style.display = 'block';
}

calculateSumButtonElement.addEventListener('click', calculateSum);

// highlights link in second section
const highlightButtonElement = document.querySelector('#highlight-links button');

function highlightLinks() {
  const linkElements = document.querySelectorAll('#highlight-links a')

  for (const link of linkElements) {
    if (link.classList.contains('highlight')) {
      link.classList.remove('highlight');
    } else {
      link.classList.add('highlight');
    }
  }

}

highlightButtonElement.addEventListener('click', highlightLinks);

// display user info
const user = {
  name: 'Nikita',
  age: 29,
  onlineCourse: 'Web Development',
}

const displayUserDataButton = document.querySelector('#user-data button')

function displayUserData() {
  // click is working 
  const outputUserDataElement = document.querySelector('#output-user-data');

  if (outputUserDataElement.children.length > 0) return;

  for (const [key, value] of Object.entries(user)) {
    const listElement = document.createElement('li');
    listElement.style.listStyle = 'none';

    outputUserDataElement.style.padding = '0';
    outputUserDataElement.style.paddingTop = '20px';
    outputUserDataElement.style.margin = '0';

    listElement.textContent = `${key.toUpperCase()}: ${value}`;
    outputUserDataElement.append(listElement);
  }

}

displayUserDataButton.addEventListener('click', displayUserData);

const rollDiceButtonElement = document.querySelector('#statistics button');

function rollDice() {
  return Math.floor(Math.random() * 6) + 1; // Math.floor(): 5.64 => 5
}

function deriveNumberOfDiceRolls() {
  const targetNumberInputElement = document.getElementById('user-target-number');
  const diceRollsListElement = document.getElementById('dice-rolls');

  const enteredNumber = targetNumberInputElement.value;
  diceRollsListElement.innerHTML = '';

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;

  while (!hasRolledTargetNumber) {
    const rolledNumber = rollDice();
    // if (rolledNumber == enteredNumber) {
    //   hasRolledTargetNumber = true;
    // }
    numberOfRolls++;
    const newRollListItemElement = document.createElement('li');
    const outputText = 'Roll ' + numberOfRolls + ': ' + rolledNumber;
    newRollListItemElement.textContent = outputText;
    diceRollsListElement.append(newRollListItemElement);
    hasRolledTargetNumber = rolledNumber == enteredNumber;
  }

  const outputTotalRollsElement = document.getElementById('output-total-rolls');
  const outputTargetNumberElement = document.getElementById('output-target-number');

  outputTargetNumberElement.textContent = enteredNumber;
  outputTotalRollsElement.textContent = numberOfRolls;
}

rollDiceButtonElement.addEventListener('click', deriveNumberOfDiceRolls);