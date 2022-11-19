import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

import style from './Nav.module.scss'

export default function Nav({ isModalMenu, getValue }) {

  function clickMenu() {
    getValue(false)
  }

  return (
    <nav className={isModalMenu ? `${style.nav} ${style.active}` : style.nav}>
      <ul className={style.nav__list}>
        <NavLink to='/' end onClick={clickMenu} className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Home</NavLink>
        <NavLink to='/teams' onClick={clickMenu} className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Teams</NavLink>
        <NavLink to='/players' onClick={clickMenu} className={({ isActive }) => isActive ? style.nav__item_active : style.nav__item}>Players</NavLink>
      </ul>
    </nav >
  )
}
