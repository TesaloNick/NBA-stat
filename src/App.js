import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header, Main } from './Components/index';
import React, { lazy, Suspense, useContext } from 'react';
import style from './App.css'
import contextData from './Context/data';


function App() {
  const data = useContext(contextData)

  console.log(data);

  return (
    <div>
      <contextData.Provider value={data}>
        <Router>
          <Header />
          <Main />
        </Router>
      </contextData.Provider>
    </div>
  );
}

export default App;
