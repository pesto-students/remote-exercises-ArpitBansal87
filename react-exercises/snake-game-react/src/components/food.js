import React from 'react';

const Food = (props) => {
  // console.log(props)
  const foodElementStyleObj = {
    top: props.location.y * props.dimensions.y,
    left: props.location.x * props.dimensions.x,
    height: props.dimensions.y,
    width: props.dimensions.x,
  };
  return <div className="foodElement" style={foodElementStyleObj}></div>;
};

export default Food;
