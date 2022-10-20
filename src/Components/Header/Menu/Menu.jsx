import React from 'react'
import style from './Menu.module.scss'

export default function Menu() {
  return (
    <div className={style.menu}>
      <span className={style.menu__span}></span>
      <span className={style.menu__span}></span>
      <span className={style.menu__span}></span>
    </div>
  )
}
