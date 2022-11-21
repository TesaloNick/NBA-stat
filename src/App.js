import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Header, Main } from './Components/index';
import React from 'react';


function App() {

  return (
    <div className='app'>
      <Router>
        <Header />
        <Main />
      </Router>
    </div>
  );
}

export default App;
