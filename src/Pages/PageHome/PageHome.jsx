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

  console.log(dataGames);

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
              <img src={`/teams-logo-images/${game.visitor_team.abbreviation}-2023.png`} alt="" />
            </Link>
            <Link to={`/team/${game.visitor_team.id}`} className={style.game__name}>{game.visitor_team.full_name}</Link>
            {game.status !== 'Final' ?
              <div className={style.game__status}>{game.status}</div> :
              <Link to={`/game/${game.id}`} className={style.game__status}>{game.visitor_team_score} : {game.home_team_score}</Link>
            }
            <Link to={`/team/${game.home_team.id}`} className={style.game__name}>{game.home_team.full_name}</Link>
            <Link to={`/team/${game.home_team.id}`} className={style.game__team_logo}>
              <img src={`/teams-logo-images/${game.home_team.abbreviation}-2023.png`} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
