import React, { useState } from 'react'
import style from './Table.module.scss'
import { Link } from 'react-router-dom'

export default function Table({ stats }) {
  const [refactoredStats, setRefactoredStats] = useState(stats)
  const sumRow = stats?.find(row => typeof row.game == 'string')

  const tableHead = [
    { name: 'Players', key: '' },
    { name: 'MP', key: '' },
    { name: '2P', key: '' },
    { name: '2PA', key: '' },
    { name: '2P%', key: '' },
    { name: '3P', key: 'fg3m' },
    { name: '3PA', key: 'fg3a' },
    { name: '3P%', key: '' },
    { name: 'FT', key: 'ftm' },
    { name: 'FTA', key: 'fta' },
    { name: 'FT%', key: '' },
    { name: 'ORB', key: 'oreb' },
    { name: 'DRB', key: 'dreb' },
    { name: 'TRB', key: 'reb' },
    { name: 'AST', key: 'ast' },
    { name: 'STL', key: 'stl' },
    { name: 'BLK', key: 'blk' },
    { name: 'TOV', key: 'turnover' },
    { name: 'PF', key: 'pf' },
    { name: 'PTS', key: 'pts' }
  ]

  function sortRows(key) {
    const statsRows = refactoredStats.filter(row => typeof row.game != 'string').sort((a, b) => {
      return b[key] - a[key];
    });
    statsRows.push(sumRow)
    setRefactoredStats(statsRows);
  }

  return (
    <div className={style.wrapper}>
      <table className={style.statsTable} style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/teams-images/${refactoredStats[0]?.team.abbreviation}-back.jpg) center/cover no-repeat`,
      }}>
        <caption>{refactoredStats[0]?.team.full_name}. Players statistics</caption>
        <thead className={style.statsTable__type}>
          <tr className={style.statsTable__row}>
            {tableHead.map(item =>
              <th
                key={item.name}
                onClick={() => sortRows(item.key)}
                style={{
                  textDecoration: item.key ? 'underline' : 'none',
                  textUnderlineOffset: '2px',
                  cursor: item.key ? 'pointer' : 'auto',
                }}
              >
                {item.name}
              </th>
            )}
          </tr>
        </thead>
        <tbody className={style.statsTable__type}>
          {refactoredStats.map(game => (
            game.min !== '00' && game.min !== null &&
            <tr className={style.statsTable__row} key={game.id}>
              <td>{game.player ?
                <Link to={`/player/${game.player.id}`}>
                  {game.player.first_name} {game.player.last_name}
                </Link> :
                'noname'
              }</td>
              <td>{game.min.length < 3 && game.min.length > 1 && game.min[0] === '0' ?
                game.min.slice(1, game.min.length) :
                game.min
              }</td>
              <td>{(game.fgm - game.fg3m).toFixed(0)}</td>
              <td>{(game.fga - game.fg3a).toFixed(0)}</td>
              <td>{
                (game.fga - game.fg3a) !== 0 ?
                  ((game.fgm - game.fg3m) / (game.fga - game.fg3a)).toFixed(2) :
                  '0.00'
              }</td>
              <td>{game.fg3m.toFixed(0)}</td>
              <td>{game.fg3a.toFixed(0)}</td>
              <td>{game.fg3a !== 0 ? (game.fg3m / game.fg3a).toFixed(2) : '0.00'}</td>
              <td>{game.ftm.toFixed(0)}</td>
              <td>{game.fta.toFixed(0)}</td>
              <td>{game.fta !== 0 ? (game.ftm / game.fta).toFixed(2) : '0.00'}</td>
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
