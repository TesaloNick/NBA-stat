import React, { useEffect, useRef, useState, useContext } from 'react'
import style from './SearchInput.module.scss'
import search from '../../../assets/images/search.png'
import close from '../../../assets/images/close.png'
import axios from 'axios';
import Spinner from '../../Pages/Spinner/Spinner'
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
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
    setIsActiveSearch(!isActiveSearch)
  }

  // if (!list) {
  //   return <Spinner />
  // }

  return (
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
  )
}
