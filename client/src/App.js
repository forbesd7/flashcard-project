import React from 'react';

import './App.css';
import Pinger from './Components/Pinger';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Deploy React + Go to Heroku using Docker
        </p>
        <Pinger />

      </header>
    </div>
  );
}

export default App;