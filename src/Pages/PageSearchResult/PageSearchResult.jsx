import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
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
        .then(res => setPlayersInfo(res.data.data))
    } else {
      setPlayersInfo(dataContext.searchPlayersResult)
    }
  }, [dataContext.searchPlayersResult])

  function savePlayerInfo(playerInfo) {
    dataContext.searchedPlayer = playerInfo
  }

  if (!playersInfo) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      {playersInfo.length > 0 ?
        playersInfo.map(player => (
          <Link to={`/player/${player.id}`} key={player.id} className={style.player} onClick={() => savePlayerInfo(player)}>
            <div className={style.player__logo_wrapper}>
              <img src={`/teams-logo-images/${player.team.abbreviation}-2023.png`} alt="" />
            </div>
            <div className={style.player__info}>
              <div className={style.player__text}><b>Name:</b> {`${player.first_name} ${player.last_name}`}</div>
              <div className={style.player__text}><b>Height:</b>
                {player.height_feet ?
                  ` ${player.height_feet}-${player.height_inches}` :
                  ' -'
                }
              </div>
              <div className={style.player__text}><b>Weight:</b>
                {player.weight_pounds ?
                  ` ${player.weight_pounds}lb` :
                  ' -'
                }
              </div>
              <div className={style.player__text}><b>Position:</b>
                {player.position ?
                  ` ${player.position}` :
                  ' -'
                }
              </div>
              <div className={style.player__text}><b>Team: </b>{player.team.abbreviation}</div>
            </div>

          </Link>
        )) :
        <div className={style.wrong}>
          <h2 className={style.wrong__title}>There have never been such players in the NBA</h2>
        </div>
      }
    </div>
  )
}
