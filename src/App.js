import React from 'react';
import translate from './api/translate';

function App() {
  const translateText = async () => {
    const result = await translate({
      text: 'こんにちは',
      from: 'ja',
      to: 'en',
    });
    console.log(result);
  };

  React.useEffect(() => {
    translateText();
  }, []);
  return <h1>Hello</h1>;
}

export default App;
