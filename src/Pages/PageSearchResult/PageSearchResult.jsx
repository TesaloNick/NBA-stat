import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import style from './PageSearchResult.module.scss'
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

export default function PageSearchResult() {
  const { searchedName } = useParams()
  const dataContext = useContext(contextData)
  const [playersInfo, setPlayersInfo] = useState(false)

  useEffect(() => {
    if (!dataContext.searchPlayersResult) {
      axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchedName}&per_page=100`)
        .then(res => {
          console.log(res.data);
          setPlayersInfo(res.data.data)
        })
    } else {
      setPlayersInfo(dataContext.searchPlayersResult)
    }
  }, [dataContext.searchPlayersResult])

  if (!playersInfo) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      {playersInfo.map(player => (
        <div key={player.id}>
          <div className={style.name}>Name: {`${player.first_name} ${player.last_name}`}</div>
          <div className={style.name}>Height: {`${player.height_feet}-${player.height_inches}`}</div>
          <div className={style.name}>Weight: {player.weight_pounds}lb</div>
          <div className={style.height}>Position: {player.position}</div>
          <div className={style.height}>Team: {player.team.full_name}</div>
          <div className={style.team__logo_wrapper}>
            <img className={style.team__logo} src={`/teams-logo-images/${player.team.abbreviation}-2023.png`} alt="" />
          </div>
        </div>
      ))}
    </div>
  )
}
