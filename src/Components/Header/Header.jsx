import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/nba-logo.webp'

import style from './Header.module.scss'
import Nav from './Nav/Nav'
import Search from './Search/Search'

export default function Header() {
  return (
    <header className={style.header}>
      <Link to='/'><img src={logo} alt="" className={style.logo} /></Link>
      <Nav />
      <Search />
    </header>
  )
}
