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
        <div key={player.id} className={style.player}>
          <div className={style.player__logo_wrapper}>
            <img src={`/teams-logo-images/${player.team.abbreviation}-2023.png`} alt="" />
          </div>
          <div className={style.player__info}>
            <div className={style.player__text}>Name: {`${player.first_name} ${player.last_name}`}</div>
            <div className={style.player__text}>Height:
              {player.height_feet ?
                ` ${player.height_feet}-${player.height_inches}` :
                ' -'
              }
            </div>
            <div className={style.player__text}>Weight:
              {player.weight_pounds ?
                ` ${player.weight_pounds}lb` :
                ' -'
              }
            </div>
            <div className={style.player__text}>Position:
              {player.position ?
                ` ${player.position}` :
                ' -'
              }
            </div>
            <div className={style.player__text}>Team: {player.team.abbreviation}</div>
          </div>

        </div>
      ))}
    </div>
  )
}
