import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './Nav.module.scss'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        <NavLink to='/' end className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Home</NavLink>
        <NavLink to='/teams' className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Teams</NavLink>
        <NavLink to='/seasons' className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Seasons</NavLink>
        <NavLink to='/standing' className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Standing</NavLink>
        <NavLink to='/players' className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Players</NavLink>
      </ul>
    </nav >
  )
}
