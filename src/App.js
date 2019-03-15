import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import api from './api/translate';
import tesseract from './utils/tesseract';

function App() {
  const webcamEl = useRef(null);
  const [status, setStatus] = useState('init');
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [recognized, setRecognized] = useState(null);
  const [translated, setTranslated] = useState(null);

  const onClickCapture = () => {
    const file = webcamEl.current.getScreenshot();
    setImage(file);
    setStatus('uploaded');
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
      <p>Status: {status}</p>
      <a onClick={onClickCapture}>
        <Webcam
          audio={false}
          ref={webcamEl}
          videoConstraints={{
            facingMode: 'environment',
          }}
        />
      </a>
      {status === 'translated' && <p>{translated}</p>}
      {status === 'recognizing' && <p>{loading}%</p>}
      {status === 'recognized' && <p>{recognized}</p>}
      {status === 'uploaded' && <img src={image} alt="投稿されたファイル" />}
    </>
  );
}

export default App;
