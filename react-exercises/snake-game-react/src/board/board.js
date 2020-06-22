import React, { useState, useEffect, useCallback } from 'react';
import Snake from '../components/snake';
import Food from '../components/food';
import './board.css';
import Instructions from '../components/instructions';

const GameBoard = (props) => {
  const { height, width, top, left } = props.layout;
  const boardElementSize = {
    x: width / 50,
    y: height / 50,
  };
  const style = {
    gameBoard: {
      height: height + 10,
      width: width + 10,
      top: top,
      left: left,
    },
  };

  const directions = {
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down',
  };

  const snakeInitialState = [
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
  ];

  const randomLocation = () => {
    const min = 0,
      max = 50;
    return {
      x: Math.floor(Math.round(Math.random() * (max - min + 1)) + min),
      y: Math.floor(Math.round(Math.random() * (max - min + 1)) + min),
    };
  };
  const isSelfCollision = (array, xValue, yValue) => {
    for(let i = array.length - 2; i >= 0; i--){
      if(array[i].x === xValue && array[i].y === yValue)
        return true;
    }
    return false;
  };

  const initialFoodLocation = { x: 23, y: 20 };
  const [direction, setDirection] = useState(directions.right);
  const [snakeLocation, setSnakeLocation] = useState(snakeInitialState);
  const [foodLocation, setFoodLocation] = useState(initialFoodLocation);
  const [continuePlaying, setContinuePlaying] = useState(false);
  const [score, setScore] = useState(0);
  const initiateSnakeMovement = useCallback(() => {
    let currentSnakeLocation = [...snakeLocation];
    let currentSnakeHeadLocation =
      currentSnakeLocation[snakeLocation.length - 1];
    let newSnakeHeadLocation = {};
    switch (direction) {
      case 'left':
        newSnakeHeadLocation = {
          x: currentSnakeHeadLocation.x - 1,
          y: currentSnakeHeadLocation.y,
        };
        break;
      case 'right':
        newSnakeHeadLocation = {
          x: currentSnakeHeadLocation.x + 1,
          y: currentSnakeHeadLocation.y,
        };
        break;
      case 'up':
        newSnakeHeadLocation = {
          x: currentSnakeHeadLocation.x,
          y: currentSnakeHeadLocation.y - 1,
        };
        break;
      case 'down':
        newSnakeHeadLocation = {
          x: currentSnakeHeadLocation.x,
          y: currentSnakeHeadLocation.y + 1,
        };
        break;
      default:
        break;
    }
    currentSnakeLocation.push(newSnakeHeadLocation);
    if (
      newSnakeHeadLocation.x === foodLocation.x &&
      newSnakeHeadLocation.y === foodLocation.y
    ) {
      setScore((scoreValue) => scoreValue + 1);
      setFoodLocation(randomLocation());
    } else {
      currentSnakeLocation.shift();
    }
    setSnakeLocation(currentSnakeLocation);
  }, [snakeLocation]);

  useEffect(() => {
    const newSnakeHeadLocation = snakeLocation[snakeLocation.length - 1];
    if (
      newSnakeHeadLocation.x === -1 ||
      newSnakeHeadLocation.y === -1 ||
      newSnakeHeadLocation.x === 51 ||
      newSnakeHeadLocation.y === 51
    ) {
      setContinuePlaying(false);
    } else if (
        isSelfCollision(snakeLocation,newSnakeHeadLocation.x, newSnakeHeadLocation.y)
    ) {
      setContinuePlaying(false);
    } else if (snakeLocation.length !== 0 && continuePlaying) {
      setContinuePlaying(true);
      setTimeout(() => {
        initiateSnakeMovement();
      }, 200);
    }
  }, [initiateSnakeMovement]);

  function startGame() {
    setContinuePlaying(true);
    initiateSnakeMovement();
  }

  function reset() {
    setSnakeLocation(snakeInitialState);
  }

  const handleKeyPress = (event) => {
    const { keyCode } = event;
    switch (keyCode) {
      case 37:
        setDirection(directions.left);
        break;
      case 38:
        setDirection(directions.up);
        break;
      case 39:
        setDirection(directions.right);
        break;
      case 40:
        setDirection(directions.down);
        break;
      case 32:
        setContinuePlaying(!continuePlaying);
        break;
      default:
        break;
    }
  };

  document.addEventListener('keydown', handleKeyPress, true);

  return (
    <>
      <div className="gameBoard" style={style.gameBoard}>
        <Snake
          location={snakeLocation}
          {...props}
          dimensions={boardElementSize}
        ></Snake>
        <Food
          location={foodLocation}
          {...props}
          dimensions={boardElementSize}
        ></Food>
      </div>
      <h1>Snake</h1>
      <h2>Current Score: {score}</h2>
      <Instructions isGameOver = {continuePlaying}></Instructions>
      <button onClick={startGame}>Start Game</button>      
    </>
  );
};

export default GameBoard;
