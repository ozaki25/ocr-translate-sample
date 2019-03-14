import React from 'react';
import translate from './api/translate';

function App() {
  const translateText = async () =>
    translate({
      text: 'こんにちは',
      from: 'ja',
      to: 'en',
    });

  const [message, setMessage] = React.useState('---');

  React.useEffect(async () => {
    setMessage(await translateText());
  }, []);

  return <h1>{message}</h1>;
}

export default App;
