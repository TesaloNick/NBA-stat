import React, { lazy, Suspense } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import style from './Main.module.scss'
import { PageHome, PageTeams, PagePlayers, PageTeam, PageSearchResult, PagePlayer, PageGame } from '../../Pages/index'

const Error = lazy(() => import('../../Pages/PageErrors/PageErrors'))


export default function Main() {
  return (
    <div className={style.main}>
      <div className={style.container}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/players' element={<PagePlayers />} />
            <Route path='/player/:id' element={<PagePlayer />} />
            <Route path='/searching/:searchedName' element={<PageSearchResult />} />
            <Route path='/teams' element={<PageTeams />} />
            <Route path='/team/:id' element={<PageTeam />} />
            <Route path='/game/:id' element={<PageGame />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
