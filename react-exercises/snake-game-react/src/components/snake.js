import React from 'react';

const Snake = (props) => {
  return (
    <div className="snakeObject">
      {props.location.map((value, index) => {
        const eleStyling = {
          top: value.y * props.dimensions.y,
          left: value.x * props.dimensions.x,
          height: props.dimensions.y,
          width: props.dimensions.x,
        };
        let snakeEleClass = '';
        if (index === props.location.length - 1) {
          snakeEleClass = 'snakeHead';
        } else {
          snakeEleClass = 'snakeElement';
        }
        return (
          <div key={index} className={snakeEleClass} style={eleStyling}></div>
        );
      })}
    </div>
  );
};

export default Snake;
