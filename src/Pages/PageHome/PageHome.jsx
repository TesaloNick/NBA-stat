import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './PageHome.module.scss'
import Spinner from '../Spinner/Spinner'
import { format, subDays } from 'date-fns'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function PageHome() {
  const [games, setGames] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get('date') ?? format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/games?dates[]=${selectedDate}`)
      .then(res => setGames(res.data.data))
  }, [selectedDate])

  function handleDate(e) {
    navigate(`/main?date=${e.target.value}`)
  }

  function changeDate(option) {
    const newDate = format(
      subDays(
        new Date(selectedDate), option === 'plus' ? -1 : 1
      ), 'yyyy-MM-dd'
    )
    navigate(`/main?date=${newDate}`)
  }

  if (!games) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <form action="" className={style.form}>
        <div className={style.form__back} onClick={() => changeDate('minus')}>Back</div>
        <input
          type="date"
          value={selectedDate}
          min="1979-01-01"
          onChange={(e) => handleDate(e)}
          className={style.form__input}
        />
        <div className={style.form__next} onClick={() => changeDate('plus')}>Next</div>
      </form>
      <div className={style.games}>
        {games.map(game => (
          <div key={game.id} className={style.game}>
            <Link to={`/team/${game.visitor_team.id}`} className={style.game__team_logo}>
              <img src={`/images/teams-logo-images/${game.visitor_team.abbreviation}-2023.png`} alt="" />
            </Link>
            <Link
              to={`/team/${game.visitor_team.id}`}
              className={style.game__fullName}
            >
              {game.visitor_team.full_name}
            </Link>
            <Link
              to={`/team/${game.visitor_team.id}`}
              className={style.game__abbreviation}
            >
              {game.visitor_team.abbreviation}
            </Link>
            {game.status === 'Final' ?
              <Link
                to={`/game/${game.id}`}
                className={style.game__status_score}
              >
                {game.visitor_team_score} : {game.home_team_score}
              </Link> :
              game.time ?
                <Link to={`/game/${game.id}`} className={style.game__status_score}>
                  <p>{`${game.visitor_team_score} : ${game.home_team_score}`}</p>

                  <p>{game.status}</p>
                </Link> :
                <div className={style.game__status}>{format(new Date(game.status), "HH:mm")}</div>
            }
            <Link
              to={`/team/${game.home_team.id}`}
              className={style.game__fullName}
            >
              {game.home_team.full_name}
            </Link>
            <Link
              to={`/team/${game.home_team.id}`}
              className={style.game__abbreviation}
            >
              {game.home_team.abbreviation}
            </Link>
            <Link
              to={`/team/${game.home_team.id}`}
              className={style.game__team_logo}
            >
              <img src={`/images/teams-logo-images/${game.home_team.abbreviation}-2023.png`} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
