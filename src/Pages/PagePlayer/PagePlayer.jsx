import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PagePlayer.module.scss'
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

export default function PagePlayer() {
  const { id } = useParams()
  const dataContext = useContext(contextData)
  const [player, setPlayer] = useState(false)
  const [seasonStats, setSeasonStats] = useState([])
  const [selectedYear, setSelectedYear] = useState('Choose season')

  useEffect(() => {
    if (!dataContext.searchedPlayer) {
      axios.get(`https://www.balldontlie.io/api/v1/players/${id}`)
        .then(res => setPlayer(res.data))
    } else {
      setPlayer(dataContext.searchedPlayer)
    }
  }, [])

  useEffect(() => {
    if (selectedYear !== 'Choose season') {
      axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${selectedYear.slice(0, 4)}-10-01&end_date=${+selectedYear.slice(0, 4) + 1}-06-01&postseason=false`)
        .then(res => setSeasonStats(res.data.data.sort((a, b) => {
          if (a.game.date.slice(0, 4) == b.game.date.slice(0, 4)) {
            if (a.game.date.slice(5, 7) == b.game.date.slice(5, 7)) {
              return +a.game.date.slice(8, 10) - +b.game.date.slice(8, 10)
            } else {
              return +a.game.date.slice(5, 7) - +b.game.date.slice(5, 7)
            }
          } else {
            return +a.game.date.slice(0, 4) - +b.game.date.slice(0, 4)
          }
        })))
    }
  }, [selectedYear])

  function changeList(event) {
    setSelectedYear(event.target.value);
  }

  if (!player || !seasonStats) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <select name="" id="" onChange={changeList} value={selectedYear} className={style.select}>
        <option className={style.select__option} value='Choose season' key='Choose season' >Choose season</option>
        {dataContext.seasons.map(year => (
          <option className={style.select__option} value={year} key={year} >{year}</option>
        ))}
      </select>
      <div key={player.id} className={style.player}>
        <Link to={`/team/${player.team.id}`} className={style.player__logo_wrapper}>
          <img src={`/teams-logo-images/${player.team.abbreviation}-2023.png`} alt="" />
        </Link>
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
          <Link to={`/team/${player.team.id}`} className={style.player__text}><b>Team: </b>{player.team.abbreviation}</Link>
        </div>
      </div>
      <div>
        {seasonStats.map(game => (
          <div key={game.id}>{game.game.date.slice(0, 10)}</div>
        ))}
      </div>
    </div>
  )
}
