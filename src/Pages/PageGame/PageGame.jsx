import React from 'react'
import { useParams } from 'react-router-dom'
import style from './PageGame.module.scss'


export default function PageGame() {
  const { id } = useParams()

  return (
    <div className={style.wrapper}>{id}</div>
  )
}
