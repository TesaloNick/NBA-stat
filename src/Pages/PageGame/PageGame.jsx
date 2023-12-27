import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PageGame.module.scss'
import Spinner from '../Spinner/Spinner'
import Table from '../../Elements/Table/Table'

export default function PageGame() {
  const { id } = useParams()
  const [stats, setStats] = useState(false)

  function sumTableRows(arr) {
    return arr.reduce((acc, obj) => {
      for (let key in obj) {
        if (acc.hasOwnProperty(key)) {
          acc[key] += obj[key];
        } else {
          acc[key] = obj[key];
        }
      }
      return acc;
    }, {});
  }

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${id}&per_page=100`)
      .then(res => {
        const data = res.data.data.map(player => {
          const min = (player.min ?? '').length > 2 ?
            +(player.min.match(/^([^:]+)/)[1].slice(0, 2)) :
            +player.min
          return { ...player, min }
        })
        const dataGame = {
          ...data[0].game,
          visitor_team_full_name: data.find(item => item.team.id === item.game.visitor_team_id).team.full_name,
          home_team_full_name: data.find(item => item.team.id === item.game.home_team_id).team.full_name,
          visitor_team_abbreviation: data.find(item => item.team.id === item.game.visitor_team_id).team.abbreviation,
          home_team_abbreviation: data.find(item => item.team.id === item.game.home_team_id).team.abbreviation,
        }
        const visitor_team = data.filter(player =>
          player.team.id === dataGame.visitor_team_id &&
          player.min &&
          player.min !== '0:00'
        ).sort((a, b) => +b.min - +a.min)
        visitor_team.push(sumTableRows(visitor_team))
        const home_team = data.filter(player =>
          player.team.id === dataGame.home_team_id &&
          player.min &&
          player.min !== '0:00'
        ).sort((a, b) => +b.min - +a.min)
        home_team.push(sumTableRows(home_team))
        setStats({
          home_team,
          visitor_team,
          dataGame
        })
      })
  }, [])

  if (!stats) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.game}>
        <div className={style.game__team}>
          <Link to={`/team/${stats.dataGame.visitor_team_id}`} className={style.game__team_logo}>
            <img src={`/images/teams-logo-images/${stats.dataGame.visitor_team_abbreviation}-2023.png`} alt="" />
          </Link>
          <Link to={`/team/${stats.dataGame.visitor_team_id}`} className={style.game__team_name}>{stats.dataGame.visitor_team_full_name}</Link>
        </div>
        <div className={style.game__middle}>
          <div className={style.game__middle_score}>
            {`${stats.dataGame.visitor_team_score} : ${stats.dataGame.home_team_score}`}
          </div>
          <div className={style.game__middle_date}>
            {`${stats.dataGame.date.slice(0, 10)}`}
          </div>
        </div>
        <div className={style.game__team}>
          <Link to={`/team/${stats.dataGame.home_team_id}`} className={style.game__team_logo}>
            <img src={`/images/teams-logo-images/${stats.dataGame.home_team_abbreviation}-2023.png`} alt="" />
          </Link>
          <Link to={`/team/${stats.dataGame.home_team_id}`} className={style.game__team_name}>{stats.dataGame.home_team_full_name}</Link>
        </div>
      </div>
      <div className={style.players}>
        <Table stats={stats.visitor_team} />
        <Table stats={stats.home_team} />
      </div>
    </div>
  )
}
