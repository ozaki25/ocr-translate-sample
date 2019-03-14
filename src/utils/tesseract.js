function recognize({ image, onProgress, onComplete }) {
  Tesseract.recognize(image)
    .progress(onProgress)
    .then(onComplete);
}

export default {
  recognize,
};
