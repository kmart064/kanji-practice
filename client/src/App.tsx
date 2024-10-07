import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <AddKanjiButton />
        <StudyKanjiButton />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

function AddKanjiButton() {
  function handleClick() {
    alert("you clicked me");
  }
  return (
    <button onClick={handleClick}>
      Add new kanji words
    </button>
  );
}

function StudyKanjiButton() {
  function handleClick() {
    alert("you clicked me");
  }
  return (
    <button onClick={handleClick}>
      Study kanji words
    </button>
  );
}