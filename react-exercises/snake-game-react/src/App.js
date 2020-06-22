import React from 'react';
import './App.css';
import GameBoard from './board/board';

function App() {
  return (
    <>
      <GameBoard layout={{height:600, width:600, top:30,left: 550}}></GameBoard>
    </>
  );
}

export default App;
