import React, { useState } from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import ModalComponent from './modal-component/modalComponent';

function App() {
  let [modalOpenSignUp, setModelSignUp] = useState(false);
  let [modalOpenSignIn, setModelSignIn] = useState(false);

  
  const closeSignIn = () => {
    setModelSignIn(false);
  };

  const closeSignUp = () => {
    setModelSignUp(false);
  };

  const Home = (props) => (
    <div>
      <button
        onClick={(e) => {
          setModelSignIn(true);
        }}
      >
        Sign In
      </button>
      <button
        onClick={(e) => {
          setModelSignUp(true);
        }}
      >
        Sign Up
      </button>
      <ModalComponent
        showModal={modalOpenSignUp}
        onClose={closeSignUp}
        size="me"
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 30,
          width: '30%',
        }}
        title="Sign Up form"
      >
        <form>
          <div className="formElement">
            <label htmlFor="emailSignUp"> Email Id: </label>
            <input type="email" id="emailSignUp" name="email" />
          </div>
          <div className="formElement">
            <label htmlFor="userNameSignUp"> User name: </label>
            <input type="text" id="userNameSignUp" name="userName" />
          </div>
          <div className="formElement">
            <label htmlFor="passwordSignUp"> Password: </label>
            <input type="password" id="passwordSignUp" name="password" />
          </div>
          <div className="formElement">
            <button onClick={event => {
              event.preventDefault();
              props.navigate('/dashboard');
            }}>Submit</button>
          </div>
        </form>
      </ModalComponent>
      <ModalComponent></ModalComponent>
      <ModalComponent
        showModal={modalOpenSignIn}
        onClose={closeSignIn}
        size="sm"
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 30,
        }}
        title="Sign In form"
      >
        <form>
          <div className="formElement">
            <label htmlFor="userNameSignIn"> User name: </label>
            <input type="text" id="userNameSignIn" name="userName" />
          </div>
          <div className="formElement">
            <label htmlFor="passwordSignIn"> Password: </label>
            <input type="password" id="passwordSignIn" name="password" />
          </div>
          <div className="formElement">
            <button onClick={event => {
              event.preventDefault();
              props.navigate('/dashboard');
            }}>Submit</button>
          </div>
        </form>
      </ModalComponent>
    </div>
  );

  const Dashboard = (props) => (
    <div>
      <h2>Dashboard Page</h2>
    </div>
  );

  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Dashboard path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
