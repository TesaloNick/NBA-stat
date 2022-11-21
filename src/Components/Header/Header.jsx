import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import Nav from './Nav/Nav'
import Search from './Search/Search'
import Menu from './Menu/Menu'

export default function Header() {
  const [isModalMenu, setIsModalMenu] = useState(false)

  function getModalValue(value) {
    setIsModalMenu(value);
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to='/'><img src={logo} alt="" className={style.logo} /></Link>
        <Nav isModalMenu={isModalMenu} getValue={getModalValue} />
        <Search />
        <Menu getValue={getModalValue} value={isModalMenu} />
      </div>
    </header>
  )
}
