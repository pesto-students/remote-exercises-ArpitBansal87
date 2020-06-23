import React from 'react';
import './App.css';
import useKeyPress from './useKeyPressed'

function App() {
  const hkeyPressed = useKeyPress('h');
  const enterKeyPressed = useKeyPress('<enter>');
  const pkeyPressed = useKeyPress('p');


  return (
    <>
      <div>
        <h1>Inside use Key press</h1>
        {hkeyPressed ? <h1>H Pressed</h1> : <h2>H Not Pressed</h2>}
        {pkeyPressed ? <h1>P Pressed</h1> : <h2>P Not Pressed</h2>}
        {enterKeyPressed ? <h1>Enter Pressed</h1> : <h2> Enter not Pressed</h2>}
      </div>
    </>
  );
}

export default App;
