import React from 'react'
import { Link } from 'react-router-dom'

import style from './Nav.module.scss'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        <Link to='/seasons' className={style.nav__item}>Seasons</Link>
        <Link to='/standing' className={style.nav__item}>Standing</Link>
        <Link to='/teams' className={style.nav__item}>Teams</Link>
        <Link to='/players' className={style.nav__item}>Players</Link>
      </ul>
    </nav>
  )
}
