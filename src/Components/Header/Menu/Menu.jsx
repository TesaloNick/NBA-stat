import React from 'react'
import style from './Menu.module.scss'

export default function Menu({ getValue, value }) {

  function clickMenu() {
    getValue(!value)
  }

  return (
    <div className={value ? `${style.active} ${style.menu}` : style.menu} onClick={clickMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
