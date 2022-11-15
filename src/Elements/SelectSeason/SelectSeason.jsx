import React, { useEffect } from 'react'
import style from './SelectSeason.module.scss'
import { Link } from 'react-router-dom'
import Spinner from '../../Pages/Spinner/Spinner'
import { useSelector } from 'react-redux'

export default function SelectSeason({ changeSeason, selectedYear }) {
  const seasons = useSelector(state => state.seasons.seasons)

  useEffect(() => {
  }, [])
  console.log(seasons);

  if (!seasons) {
    return <Spinner />
  }

  return (
    <select name="" id="" onChange={changeSeason} value={selectedYear} className={style.select}>
      {seasons.map(year => (
        <option className={style.select__option} value={year} key={year} >{year}</option>
      ))}
    </select>
  )
}
