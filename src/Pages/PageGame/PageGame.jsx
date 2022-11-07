import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PageGame.module.scss'
import Spinner from '../Spinner/Spinner'
import contextData from '../../Context/data'
import { useContext } from 'react'

export default function PageGame() {
  const { id } = useParams()
  const [stats, setStats] = useState(false)
  const dataContext = useContext(contextData)

  const tableHead = ['Players', 'MP', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', ' BLK', 'TOV', 'PF', 'PTS']

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${id}`)
      .then(res => {
        const data = res.data.data
        // console.log(data.find(item => item.team.id === item.game.visitor_team_id));
        const dataGame = {
          ...data[0].game,
          home_team_abbreviation: data.find(item => item.team.id === item.game.home_team_id).team.abbreviation,
          home_team_full_name: data.find(item => item.team.id === item.game.home_team_id).team.full_name,
          visitor_team_abbreviation: data.find(item => item.team.id === item.game.visitor_team_id).team.abbreviation,
          visitor_team_full_name: data.find(item => item.team.id === item.game.visitor_team_id).team.full_name,
        }
        const visitor_team = data.filter(player => player.team.id === dataGame.visitor_team_id)
        const home_team = data.filter(player => player.team.id === dataGame.home_team_id)
        setStats({
          home_team,
          visitor_team,
          dataGame
        })
      })
  }, [])

  console.log(stats);

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
          <h1 className={style.game__team_name}>{stats.dataGame.visitor_team_full_name}</h1>
        </div>
        <div className={style.game__middle}>
          <div className={style.game__middle_score}>{`${stats.dataGame.visitor_team_score}:${stats.dataGame.home_team_score}`}</div>
          <div className={style.game__middle_date}>{`${stats.dataGame.date.slice(0, 10)}`}</div>
        </div>
        <div className={style.game__team}>
          <Link to={`/team/${stats.dataGame.home_team_id}`} className={style.game__team_logo}>
            <img src={`/teams-logo-images/${stats.dataGame.home_team_abbreviation}-2023.png`} alt="" />
          </Link>
          <h1 className={style.game__team_name}>{stats.dataGame.home_team_full_name}</h1>
        </div>
      </div>
      <div className={style.players}>
        <table className={style.statsTable}>
          <caption className={style.statsTable__title}>{stats.dataGame.home_team_full_name}. Players statistics</caption>
          <thead className={style.statsTable__type}>
            <tr className={style.statsTable__row}>
              {tableHead.map(item => <th key={item}>{item}</th>)}
            </tr>
          </thead>
          <tbody className={style.statsTable__type}>
            {stats.home_team.map(game => (
              <tr className={style.statsTable__row} key={game.id}>
                {game.min !== '00' && <>
                  <td>{game.player.first_name} {game.player.last_name}</td>
                  <td>{game.min}</td>
                  <td>{(game.fgm - game.fg3m).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a) !== 0 ? ((game.fgm - game.fg3m) / (game.fga - game.fg3a)).toFixed(2) : '0.0'}</td>
                  <td>{game.fg3m.toFixed(0)}</td>
                  <td>{game.fg3a.toFixed(0)}</td>
                  <td>{game.fg3_pct.toFixed(2)}</td>
                  <td>{game.ftm.toFixed(0)}</td>
                  <td>{game.fta.toFixed(0)}</td>
                  <td>{game.ft_pct.toFixed(2)}</td>
                  <td>{game.oreb.toFixed(0)}</td>
                  <td>{game.dreb.toFixed(0)}</td>
                  <td>{game.reb.toFixed(0)}</td>
                  <td>{game.ast.toFixed(0)}</td>
                  <td>{game.stl.toFixed(0)}</td>
                  <td>{game.blk.toFixed(0)}</td>
                  <td>{game.turnover.toFixed(0)}</td>
                  <td>{game.pf.toFixed(0)}</td>
                  <td>{game.pts.toFixed(0)}</td>
                </>
                }
              </tr>
            ))}
          </tbody>
        </table>
        <table className={style.statsTable}>
          <caption className={style.statsTable__title}>{stats.dataGame.visitor_team_full_name}. Players statistics</caption>
          <thead className={style.statsTable__type}>
            <tr className={style.statsTable__row}>
              {tableHead.map(item => <th key={item}>{item}</th>)}
            </tr>
          </thead>
          <tbody className={style.statsTable__type}>
            {stats.visitor_team.map(game => (
              <tr className={style.statsTable__row} key={game.id}>
                {game.min !== '00' && <>
                  <td>{game.player.first_name} {game.player.last_name}</td>
                  <td>{game.min}</td>
                  <td>{(game.fgm - game.fg3m).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a) !== 0 ? ((game.fgm - game.fg3m) / (game.fga - game.fg3a)).toFixed(2) : '0.0'}</td>
                  <td>{game.fg3m.toFixed(0)}</td>
                  <td>{game.fg3a.toFixed(0)}</td>
                  <td>{game.fg3_pct.toFixed(2)}</td>
                  <td>{game.ftm.toFixed(0)}</td>
                  <td>{game.fta.toFixed(0)}</td>
                  <td>{game.ft_pct.toFixed(2)}</td>
                  <td>{game.oreb.toFixed(0)}</td>
                  <td>{game.dreb.toFixed(0)}</td>
                  <td>{game.reb.toFixed(0)}</td>
                  <td>{game.ast.toFixed(0)}</td>
                  <td>{game.stl.toFixed(0)}</td>
                  <td>{game.blk.toFixed(0)}</td>
                  <td>{game.turnover.toFixed(0)}</td>
                  <td>{game.pf.toFixed(0)}</td>
                  <td>{game.pts.toFixed(0)}</td>
                </>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
