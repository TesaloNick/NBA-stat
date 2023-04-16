import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './PageHome.module.scss'
import Spinner from '../Spinner/Spinner'
import { format, subDays } from 'date-fns'
import { Link } from 'react-router-dom'

export default function PageHome() {
  const [dataGames, setDataGames] = useState(false)
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
      .then(res => setDataGames(res.data.data))
  }, [date])

  function handleDate(e) {
    setDate(e.target.value)
  }

  function changeDate(option) {
    setDate(
      format(
        subDays(
          new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10)), option === 'plus' ? -1 : 1
        ), 'yyyy-MM-dd'
      )
    )
  }

  if (!dataGames) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <form action="" className={style.form}>
        <div className={style.form__back} onClick={() => changeDate('minus')}>Back</div>
        <input type="date" value={date} min="1979-01-01" onChange={(e) => handleDate(e)} className={style.form__input} />
        <div className={style.form__next} onClick={() => changeDate('plus')}>Next</div>
      </form>
      <div className={style.games}>
        {dataGames.map(game => (
          <div key={game.id} className={style.game}>
            <Link to={`/team/${game.visitor_team.id}`} className={style.game__team_logo}>
              <img src={`/images/teams-logo-images/${game.visitor_team.abbreviation}-2023.png`} alt="" />
            </Link>
            <Link to={`/team/${game.visitor_team.id}`} className={style.game__fullName}>{game.visitor_team.full_name}</Link>
            <Link to={`/team/${game.visitor_team.id}`} className={style.game__abbreviation}>{game.visitor_team.abbreviation}</Link>
            {game.status === 'Final' ?
              <Link to={`/game/${game.id}`} className={style.game__status_score}>{game.visitor_team_score} : {game.home_team_score}</Link> :
              game.postseason ?
                <div className={style.game__status}>{
                  `${game.status.slice(11, 16)}`
                }</div>:
                game.time !== '' ?
                  <Link to={`/game/${game.id}`} className={style.game__status_score}>
                    <p>{`${game.visitor_team_score} : ${game.home_team_score}`}</p>
                    <p>{`(${game.status})`}</p>
                  </Link> :
                  <div className={style.game__status}>{game.status}</div>
            }
            <Link to={`/team/${game.home_team.id}`} className={style.game__fullName}>{game.home_team.full_name}</Link>
            <Link to={`/team/${game.home_team.id}`} className={style.game__abbreviation}>{game.home_team.abbreviation}</Link>
            <Link to={`/team/${game.home_team.id}`} className={style.game__team_logo}>
              <img src={`/images/teams-logo-images/${game.home_team.abbreviation}-2023.png`} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
