import React from 'react';

import './App.css';
import Decks from './Components/Decks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Deploy React + Go to Heroku using Docker
        </p>
        <Decks />

      </header>
    </div>
  );
}

export default App;