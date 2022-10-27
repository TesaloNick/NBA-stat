import React, { useEffect, useRef, useState, useContext } from 'react'
import search from '../../../assets/images/search.png'
import close from '../../../assets/images/close.png'
import style from './Search.module.scss'
import axios from 'axios';
import PageSearchResult from '../../../Pages/PageSearchResult/PageSearchResult';
import { Link } from 'react-router-dom';
import contextData from '../../../Context/data';

export default function Search() {
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const [searchedName, setSearchedName] = useState('')
  // const [searchResult, setSearchResult] = useState(false)
  const inputRef = useRef(null)
  const dataContext = useContext(contextData)

  useEffect(() => {
    if (inputRef) inputRef.current.focus()
  }, [isActiveSearch])

  useEffect(() => {
    if (searchedName.length >= 3) {
      axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchedName}&per_page=100`)
        .then(res => {
          // setSearchResult(res.data.data)
          dataContext.searchPlayersResult = res.data.data
        })
    }
  }, [searchedName])

  function toggleInputSearch(event) {
    event.stopPropagation()
    setIsActiveSearch(!isActiveSearch)
  }

  function changeSearchingValue(event) {
    setSearchedName(event.target.value)
  }

  return (
    <div className={style.search}>
      <div className={style.search__image_wrapper} onClick={toggleInputSearch}>
        <img className={style.search__image} src={search} alt="" />
      </div>
      {isActiveSearch ?
        <div className={style.search__active_wrapper}>
          {/* <div className={`${style.search__close} ${style.active}`} onClick={toggleInputSearch}></div> */}
          <input className={style.search__input_active} type="text" placeholder='Ja Morant' ref={inputRef} value={searchedName} onChange={changeSearchingValue} />
          <Link to={`/searching/${searchedName}`} className={style.search__search_button}>
            <img src={search} alt="" />
          </Link>
          <div className={style.search__close_button} onClick={toggleInputSearch}>
            <img src={close} alt="" />
          </div>
        </div> :
        <div className={style.search__active_wrapper}>
          {/* <div className={style.search__close} onClick={toggleInputSearch}></div> */}
          <input className={style.search__input} type="text" ref={inputRef} />
        </div>
      }
    </div>
  )
}
