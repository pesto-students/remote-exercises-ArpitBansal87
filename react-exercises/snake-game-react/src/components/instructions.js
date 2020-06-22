import React from 'react';

const Instructions = (props) => {
  return (
    <div>
      <h2>Instructions: </h2>
      <span>1. User Arrow keys to move the snake</span>
      <span>2. Press 'R' to reset the board and score</span>
      {props.isGameOver ? <span>Press 'R' to restart the game</span> : <></>}
    </div>
  );
};

export default Instructions;
