const previewImageElement = document.getElementById('image-preview');
const uploadedImageElement = document.getElementById('image');

function uploadedImageChangeHandler(event) {
  const files = event.target.files;

  if (!files || files.length === 0) {
    previewImageElement.style.display = 'none';
    console.log('no files');
    return;
  }

  previewImageElement.src = URL.createObjectURL(files[0]);
  previewImageElement.style.display = 'block';
}

uploadedImageElement.addEventListener('change', uploadedImageChangeHandler);