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

  const tableHead = ['Players', 'MP', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', ' BLK', 'TOV', 'PF', 'PTS']

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${id}&per_page=100`)
      .then(res => {
        const data = res.data.data

        const dataGame = {
          ...data[0].game,
          visitor_team_full_name: data.find(item => item.team.id === item.game.visitor_team_id).team.full_name,
          home_team_full_name: data.find(item => item.team.id === item.game.home_team_id).team.full_name,
          visitor_team_abbreviation: data.find(item => item.team.id === item.game.visitor_team_id).team.abbreviation,
          home_team_abbreviation: data.find(item => item.team.id === item.game.home_team_id).team.abbreviation,
        }
        const visitor_team = data.filter(player => player.team.id === dataGame.visitor_team_id && player.min != false && player.min !== '0:00')
        const home_team = data.filter(player => player.team.id === dataGame.home_team_id && player.min != false && player.min !== '0:00')
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
            <img src={`/teams-logo-images/${stats.dataGame.visitor_team_abbreviation}-2023.png`} alt="" />
          </Link>
          <Link to={`/team/${stats.dataGame.home_team_id}`} className={style.game__team_name}>{stats.dataGame.visitor_team_full_name}</Link>
        </div>
        <div className={style.game__middle}>
          <div className={style.game__middle_score}>{`${stats.dataGame.visitor_team_score}:${stats.dataGame.home_team_score}`}</div>
          <div className={style.game__middle_date}>{`${stats.dataGame.date.slice(0, 10)}`}</div>
        </div>
        <div className={style.game__team}>
          <Link to={`/team/${stats.dataGame.home_team_id}`} className={style.game__team_logo}>
            <img src={`/teams-logo-images/${stats.dataGame.home_team_abbreviation}-2023.png`} alt="" />
          </Link>
          <Link to={`/team/${stats.dataGame.home_team_id}`} className={style.game__team_name}>{stats.dataGame.home_team_full_name}</Link>
        </div>
      </div>
      <div className={style.players}>
        <Table tableHead={tableHead} stats={stats.visitor_team} />
        <Table tableHead={tableHead} stats={stats.home_team} />
      </div>
    </div>
  )
}
