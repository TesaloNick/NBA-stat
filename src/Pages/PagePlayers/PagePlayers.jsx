import React, { useEffect, useRef, useState, useContext } from 'react'
import style from './PagePlayers.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePlayersSearchResult } from '../../store/playersSearchResult';

export default function PagePlayers() {
  const [searchedName, setSearchedName] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function changeSearchingValue(event) {
    setSearchedName(event.target.value)
  }

  function submitSearch(event) {
    event.preventDefault()
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchedName}&per_page=100&page=1`)
      .then(res => {
        dispatch(changePlayersSearchResult(res.data.data))
      })

    navigate(`/searching/${searchedName}`)
  }

  return (
    <div className={style.wrapper}>
      <h1>Find Player</h1>
      <form className={style.form} onSubmit={submitSearch}>
        <input className={style.form__input} type="text" placeholder='Ja Morant' ref={inputRef} value={searchedName} onChange={changeSearchingValue} required />
        <button className={style.form__button}>Search</button>
      </form>
    </div >
  )
}
