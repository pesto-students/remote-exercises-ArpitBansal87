import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groceryList: [{ value: 'Apple', quantity: 1, selected: false }],
      currentText: '',
    };

    this.handleGroceryItemAdd = this.handleGroceryItemAdd.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleClearOperation = this.handleClearOperation.bind(this);
  }
  handleClearOperation() {
    this.setState((state) => {
      return {
        groceryList: [],
        currentText: '',
      };
    });
  }
  handleGroceryItemAdd(event) {
    event.preventDefault();
    let isItemDuplicate = false;
    let newState = this.state.groceryList.map((ele) => {
      if (ele.value === this.state.currentText) {
        ele.quantity = ele.quantity + 1;
        isItemDuplicate = true;
      }
      return ele;
    });
    if (!isItemDuplicate) {
      newState = this.state.groceryList.concat({
        value: this.state.currentText,
        quantity: 1,
      });
    }
    this.setState((state) => {
      return {
        groceryList: newState,
        currentText: '',
      };
    });
  }
  listItemClicked(item) {
    console.log(item);
    const newState = this.state.groceryList.map((ele) => {
      if (ele.value === item) ele.selected = false;
      return ele;
    });
    this.setState((state) => {
      return {
        ...state,
        groceryList: newState,
      };
    });
  }
  handleChangeText(event) {
    const currentValue = event.target.value;
    this.setState((state) => {
      return {
        ...state,
        currentText: currentValue,
      };
    });
  }
  render() {
    return (
      <div id="outer-div">
        <h2>Reactive Grocery List</h2>
        <button
          id="ClearButton"
          onClick={(event) => this.handleClearOperation(event)}
        >
          Clear
        </button>
        <ul>
          {this.state.groceryList.map((item) => {
            return (
              <li
                className="groceryListItem"
                key={item.value}
                id={item.value}
                onClick={() => this.listItemClicked(item.value)}
                className={item.selected === 'false' ? "redText groceryListItem": "normalText groceryListItem"}
              >
                <span>{item.value}</span>{' '}
                <span>{item.quantity > 1 ? `x` + item.quantity : ''}</span>
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          name="groceryItem"
          id="grocer-item"
          value={this.state.currentText}
          onChange={this.handleChangeText}
          style={{ marginRight: '20px' }}
        ></input>
        <button onClick={(event) => this.handleGroceryItemAdd(event)}>
          Add Grocery item
        </button>
      </div>
    );
  }
}

export default App;
