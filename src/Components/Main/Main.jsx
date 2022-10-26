import React, { lazy, Suspense } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import style from './Main.module.scss'
import { PageHome, PageSeasons, PageTeams, PagePlayers, PageStanding, PageTeam } from '../../Pages/index'

const Error = lazy(() => import('../../Pages/PageErrors/PageErrors'))


export default function Main() {
  return (
    <div className={style.main}>
      <div className={style.container}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path='/' element={<PageHome />} />
            <Route path='/seasons' element={<PageSeasons />} />
            <Route path='/standing' element={<PageStanding />} />
            <Route path='/players' element={<PagePlayers />} />
            <Route path='/teams' element={<PageTeams />} />
            <Route path='/team/:id' element={<PageTeam />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
