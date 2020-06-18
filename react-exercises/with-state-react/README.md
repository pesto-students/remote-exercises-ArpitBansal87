# Instructions

Implement these utilities from [recompose](https://github.com/acdlite/recompose) library. You are free to look at the source code.

## withState

- **Inputs**
  - The key name which will contain the state value.
  - The setter which will be invoked to alter the state's value.
  - The _initialValue_ of the state
- **Output**
  - An HOC which can inject state into components.
- **Example**

```js
const enhance = withState('counter', 'setCounter', 0);
const Counter = enhance(({ counter, setCounter }) => (
  <div>
    Count: {counter}
    <button onClick={() => setCounter((n) => n + 1)}>Increment</button>
    <button onClick={() => setCounter((n) => n - 1)}>Decrement</button>
  </div>
));
```

## withHandlers
- **Inputs**
  - An object containing event handlers. Take special note of the example below. The handlers are curried functions. on `props` and `event` object.

- **Output**
  - An HOC with the handlers as props.

- **Example**
```js
const stateEnhancer = withState('value', 'updateValue', '');
const handlers = withHandlers({
  onChange: (props) => (event) => {
    props.updateValue(event.target.value);
  },
  onSubmit: (props) => (event) => {
    event.preventDefault();
    console.log(props.value);
  },
});

function FormComponent({ value, onChange, onSubmit }) {
  return <form onSubmit={onSubmit}>
    <label>
      Value
      <input type="text" value={value} onChange={onChange} />
    </label>
    <input type="submit" value="Click" />
  </form>
}

const FormWithHandler = handlers(FormComponent);
const Form = stateEnhancer(FormWithHandler);

function App() {
  return <Form />;
}
```

## Restrictions
- Don't use React Hooks or any external libraries.
