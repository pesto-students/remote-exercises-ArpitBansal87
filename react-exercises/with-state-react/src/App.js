import React, { createFactory } from 'react';
import './App.css';

function withState (key, setter, initialValue) {
  return function (Comp){
    return class extends React.Component {
      constructor(props) {
        super();
        this.state = {
          [key]: initialValue,
        }
      }
      [setter] = (value) => {
        this.setState(prevState => ({
          [key]: value
        }))
      }
      updateStateValue = (updatefn, callback) => {
        this.setState(
        prevState => ({
          [key]: typeof updatefn === 'function' ? updatefn(prevState[key]) : updatefn,
        }), callback
      )}
      render() {
        const fn = this[setter];
        let Obj = <Comp {...this.props} {...{[setter]: this.updateStateValue}} {...this.state} />
        return Obj;
      }
    }
  }
}

const enhance = withState('counter', 'setCounter', 0);
const Counter = enhance(({ counter, setCounter }) => (
  <div>
    Count: {counter} value
    <button onClick={() => setCounter((n) => n + 1)}>Increment</button>
    <button onClick={() => setCounter((n) => n - 1)}>Decrement</button>
  </div>
));

function App() {
  return (
    <>
      <Counter></Counter>
    </>
  );
}

export default App;
