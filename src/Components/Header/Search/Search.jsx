import React from 'react'
import search from '../../../assets/images/search.png'

import style from './Search.module.scss'

export default function Search() {
  return (
    <div className={style.search}>
      <img src={search} alt="" />
    </div>
  )
}
