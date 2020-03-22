import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi there
        </p>
        <a
          className="App-link"
          href="/auth/signin"
          target="_blank"
          rel="Sign in"
        >
          Sign in
        </a>
      </header>
    </div>
  );
}

export default App;
