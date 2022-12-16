const showWithOpacity = (element, durationMS) => {
  playerNameInputElement.focus();

  element.classList.add('animate-show-opacity');
  element.style.animationDuration = durationMS + 'ms';
  element.style.display = 'block';

  setTimeout(() => {
    element.classList.remove('animate-show-opacity');
  }, durationMS);
}

const hideWithOpacity = (element, durationMS) => {
  return new Promise((resolve) => {
    element.style.animationDuration = durationMS + 'ms';
    element.classList.add('animate-hide-opacity');

    setTimeout(() => {
      element.classList.remove('animate-hide-opacity');
      element.style.display = 'none';
      resolve();
    }, durationMS);
  })
}