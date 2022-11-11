import React from 'react'
import style from './Table.module.scss'
import { Link } from 'react-router-dom'

export default function Table({ tableHead, stats }) {

  return (
    <div className={style.wrapper}>
      <table className={style.statsTable}>
        <caption>{stats[0].team.full_name}. Players statistics</caption>
        <thead className={style.statsTable__type}>
          <tr className={style.statsTable__row}>
            {tableHead.map(item => <th key={item}>{item}</th>)}
          </tr>
        </thead>
        <tbody className={style.statsTable__type}>
          {stats.map(game => (
            game.min !== '00' && game.min !== null &&
            <tr className={style.statsTable__row} key={game.id}>
              <td><Link to={`/player/${game.player.id}`}>{game.player.first_name} {game.player.last_name}</Link></td>
              <td>{game.min.length < 3 && game.min.length > 1 && game.min[0] === '0' ? game.min.slice(1, game.min.length) : game.min}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
