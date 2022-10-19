import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PageHome, PageSeasons, PageTeams, PagePlayers, PageStanding } from './Pages/index'
import { Header } from './Components/index';
import React, { lazy, Suspense } from 'react';
import style from './App.css'

const Error = lazy(() => import('./Pages/PageErrors/PageErrors'))

function App() {
  return (
    <div>
      <Router>
        <div className='header'>
          <Header />
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/seasons' element={<PageSeasons />} />
            <Route path='/standing' element={<PageStanding />} />
            <Route path='/players' element={<PagePlayers />} />
            <Route path='/teams' element={<PageTeams />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
