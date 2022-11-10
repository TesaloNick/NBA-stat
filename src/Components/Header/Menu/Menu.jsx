import React, { useState } from 'react'
import style from './Menu.module.scss'

export default function Menu({ getValue, value }) {
  // const [isModal, setIsModal] = useState(false)

  function clickMenu() {
    // setIsModal(!value)
    getValue(!value)
  }
  console.log(value);
  return (
    <div className={value ? `${style.active} ${style.menu}` : style.menu} onClick={clickMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
