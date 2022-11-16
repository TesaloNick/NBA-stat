import React, { useEffect, useRef, useState, useContext } from 'react'
import search from '../../../assets/images/search.png'
import close from '../../../assets/images/close.png'
import style from './Search.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import contextData from '../../../Context/data';

export default function Search() {
  const [isActiveSearch, setIsActiveSearch] = useState(false)
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

  function toggleInputSearch(event) {
    event.stopPropagation()
    if (!isActiveSearch) inputRef.current.focus()
    setIsActiveSearch(!isActiveSearch)
  }

  function changeSearchingValue(event) {
    setSearchedName(event.target.value)
  }

  function submitSearch(event) {
    event.preventDefault()
    navigate(`/searching/${searchedName}`)
    setIsActiveSearch(!isActiveSearch)
  }

  return (
    <div className={style.search}>
      <div className={style.search__image} onClick={toggleInputSearch}>
        <img src={search} alt="" />
      </div>
      <form className={style.form} onSubmit={submitSearch}>
        <input
          className={isActiveSearch ?
            style.form__input_active :
            style.form__input
          }
          type="text" placeholder='Ja Morant' ref={inputRef} value={searchedName} onChange={changeSearchingValue} />
        {isActiveSearch && <>
          <button className={style.form__search_button}>
            <img src={search} alt="" />
          </button>
          <div className={style.form__close_button} onClick={toggleInputSearch}>
            <img src={close} alt="" />
          </div>
        </>
        }
      </form>
    </div>
  )
}
