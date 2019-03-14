import React, { useEffect, useRef, useState } from 'react';
import api from './api/translate';
import tesseract from './utils/tesseract';

function App() {
  const inputFileEl = useRef(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [recognized, setRecognized] = useState(null);
  const [translated, setTranslated] = useState(null);

  const onChangeFile = () => {
    const file = inputFileEl.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      setStatus('uploaded');
    };
  };

  const recognize = () => {
    const onProgress = p => {
      const loading =
        p.status === 'recognizing text' ? Math.floor(p.progress * 100) : 0;
      setLoading(loading);
      setStatus('recognizing');
    };
    const onComplete = result => {
      setRecognized(result.text);
      setStatus('recognized');
    };
    tesseract.recognize({ image, onProgress, onComplete });
  };

  const translate = async () => {
    const result = await api({ text: recognized, from: 'en', to: 'ja' });
    setTranslated(result);
    setStatus('translated');
  };

  useEffect(() => {
    if (image) recognize();
  }, [image]);

  useEffect(() => {
    if (recognized) translate();
  }, [recognized]);

  return (
    <>
      <input type="file" ref={inputFileEl} onChange={onChangeFile} />
      {status === 'translated' && <p>{translated}</p>}
      {status === 'recognizing' && <p>{loading}%</p>}
      {status === 'recognized' && <p>{recognized}</p>}
      {status === 'uploaded' && <img src={image} alt="投稿されたファイル" />}
    </>
  );
}

export default App;
