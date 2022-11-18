import React, { useEffect, useRef, useState, useContext } from 'react'
import style from './PagePlayers.module.scss'
import search from '../../assets/images/search.png'
import close from '../../assets/images/close.png'
import axios from 'axios';
import Spinner from '../../Pages/Spinner/Spinner'
import { useNavigate } from 'react-router-dom';
import contextData from '../../Context/data';

export default function PagePlayers() {
  const [searchedName, setSearchedName] = useState('')
  const inputRef = useRef(null)
  const dataContext = useContext(contextData)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchedName.length >= 3) {
      axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchedName}&per_page=100&page=1`)
        .then(res => {
          dataContext.searchPlayersResult = res.data.data
        })
    }
  }, [searchedName])

  function changeSearchingValue(event) {
    setSearchedName(event.target.value)
  }

  function submitSearch(event) {
    event.preventDefault()
    navigate(`/searching/${searchedName}`)
    // setIsActiveSearch(!isActiveSearch)
  }

  // if (!list) {
  //   return <Spinner />
  // }

  return (
    <div className={style.wrapper}>
      <h1>Find Player</h1>
      <form className={style.form} onSubmit={submitSearch}>
        <input className={style.form__input} type="text" placeholder='Ja Morant' ref={inputRef} value={searchedName} onChange={changeSearchingValue} />
        <button className={style.form__button}>Search</button>
        {/* <div className={style.form__close_button} onClick={toggleInputSearch}>
          <img src={close} alt="" />
        </div> */}
      </form>
    </div >
  )
}
