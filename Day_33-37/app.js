const productNameInputElement = document.getElementById('product-name');
const counterLeftElement = document.getElementById('input-size-left');

const maxAllowedCharacters = productNameInputElement.maxLength;

const updateRemainingCharacters = (event) => {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;

  const remainingCharacter = maxAllowedCharacters - enteredTextLength;

  if (remainingCharacter <= 10) {
    productNameInputElement.classList.add('near-limit')
    counterLeftElement.classList.add('near-limit')
  } else {
    productNameInputElement.classList.remove('near-limit');
    counterLeftElement.classList.remove('near-limit');
  }

  counterLeftElement.textContent = remainingCharacter;
}

productNameInputElement.addEventListener('input', updateRemainingCharacters);