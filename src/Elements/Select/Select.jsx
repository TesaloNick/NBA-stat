import React from 'react'
import style from './Select.module.scss'
import Spinner from '../../Pages/Spinner/Spinner'

export default function Select({ change, value, list }) {

  if (!list) {
    return <Spinner />
  }

  return (
    <select name="" id="" onChange={change} value={value} className={style.select}>
      {list.map(year => (
        <option className={style.select__option} value={year} key={year} >{year}</option>
      ))}
    </select>
  )
}
