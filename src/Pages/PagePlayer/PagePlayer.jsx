import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PagePlayer.module.scss'
import arrow from '../../assets/images/arrow.png'
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

export default function PagePlayer() {
  const { id } = useParams()
  const dataContext = useContext(contextData)
  const [playerInfo, setPlayerInfo] = useState(false)
  const [selectedYear, setSelectedYear] = useState('Choose season')
  const [averageSeasonStat, setAverageSeasonStat] = useState(false)
  const [isSeasonsStat, setIsSeasonsStat] = useState(false)
  const [seasonStats, setSeasonStats] = useState([])

  useEffect(() => {
    if (!dataContext.searchedPlayer) {
      axios.get(`https://www.balldontlie.io/api/v1/players/${id}`)
        .then(res => setPlayerInfo(res.data))
    } else {
      setPlayerInfo(dataContext.searchedPlayer)
    }
  }, [])


  // useEffect(() => {
  // if (selectedYear !== 'Choose season') {
  // axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${selectedYear.slice(0, 4)}-10-01&end_date=${+selectedYear.slice(0, 4) + 1}-07-01&postseason=false`)
  //   .then(res => {
  //     setSeasonStats(res.data.data
  //       .filter(game => game.min !== '0:00' && game.min !== "")
  //       .sort((a, b) => {
  //         if (a.game.date.slice(0, 4) == b.game.date.slice(0, 4)) {
  //           if (a.game.date.slice(5, 7) == b.game.date.slice(5, 7)) {
  //             return +a.game.date.slice(8, 10) - +b.game.date.slice(8, 10)
  //           } else {
  //             return +a.game.date.slice(5, 7) - +b.game.date.slice(5, 7)
  //           }
  //         } else {
  //           return +a.game.date.slice(0, 4) - +b.game.date.slice(0, 4)
  //         }
  //       }))
  //   })
  // }
  // }, [selectedYear])

  function changeList(event) {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${event.target.value.slice(0, 4)}&player_ids[]=${id}`)
      .then(res => setAverageSeasonStat(res.data.data[0]))

    setSelectedYear(event.target.value);
  }

  function showDetailedStats() {
    setIsSeasonsStat(!isSeasonsStat)

    axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${selectedYear.slice(0, 4)}-10-01&end_date=${+selectedYear.slice(0, 4) + 1}-07-01&postseason=false`)
      .then(res => {
        setSeasonStats(res.data.data
          .filter(game => game.min !== '0:00' && game.min !== "")
          .sort((a, b) => {
            if (a.game.date.slice(0, 4) == b.game.date.slice(0, 4)) {
              if (a.game.date.slice(5, 7) == b.game.date.slice(5, 7)) {
                return +a.game.date.slice(8, 10) - +b.game.date.slice(8, 10)
              } else {
                return +a.game.date.slice(5, 7) - +b.game.date.slice(5, 7)
              }
            } else {
              return +a.game.date.slice(0, 4) - +b.game.date.slice(0, 4)
            }
          }))
      })
  }

  if (!playerInfo) {
    return (<Spinner />)
  }
  console.log(averageSeasonStat);

  return (
    <div className={style.wrapper}>
      <select name="" id="" onChange={changeList} value={selectedYear} className={style.select}>
        <option className={style.select__option} value='Choose season' key='Choose season' >Choose season</option>
        {dataContext.seasons.map(year => (
          <option className={style.select__option} value={year} key={year} >{year}</option>
        ))}
      </select>
      <div key={playerInfo.id} className={style.player}>
        <Link to={`/team/${playerInfo.team.id}`} className={style.player__logo_wrapper}>
          <img src={`/teams-logo-images/${playerInfo.team.abbreviation}-2023.png`} alt="" />
        </Link>
        <div className={style.player__info}>
          <div className={style.player__text}><b>Name:</b> {`${playerInfo.first_name} ${playerInfo.last_name}`}</div>
          <div className={style.player__text}><b>Height:</b>
            {playerInfo.height_feet ?
              ` ${playerInfo.height_feet}-${playerInfo.height_inches}` :
              ' -'
            }
          </div>
          <div className={style.player__text}><b>Weight:</b>
            {playerInfo.weight_pounds ?
              ` ${playerInfo.weight_pounds}lb` :
              ' -'
            }
          </div>
          <div className={style.player__text}><b>Position:</b>
            {playerInfo.position ?
              ` ${playerInfo.position}` :
              ' -'
            }
          </div>
          <div className={style.player__text}><b>Team: </b>{playerInfo.team.abbreviation}</div>
        </div>
      </div>
      <div className={style.stat}>
        {selectedYear !== 'Choose season' && averageSeasonStat ?
          <div className={style.stat__average}>
            <h2 className={style.stat__average_title}>Average stat in season {averageSeasonStat.season}-{+averageSeasonStat.season + 1}</h2>
            <table className={style.table}>
              <tbody className={style.table__type}>
                <tr className={style.table__row}>
                  <th>Season</th>
                  <th>G</th>
                  <th>MP</th>
                  <th>2P</th>
                  <th>2PA</th>
                  <th>2P%</th>
                  <th>3P</th>
                  <th>3PA</th>
                  <th>3P%</th>
                  <th>FT</th>
                  <th>FTA</th>
                  <th>FT%</th>
                  <th>ORB</th>
                  <th>DRB</th>
                  <th>TRB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>TOV</th>
                  <th>PF</th>
                  <th>PTS</th>
                </tr>
              </tbody>
              <tbody className={style.table__type}>
                <tr className={style.table__row}>
                  <th>{averageSeasonStat.season}-{+averageSeasonStat.season + 1}</th>
                  <th>{averageSeasonStat.games_played.toFixed(0)}</th>
                  <th>{averageSeasonStat.min}</th>
                  <th>{(averageSeasonStat.fgm - averageSeasonStat.fg3m).toFixed(1)}</th>
                  <th>{(averageSeasonStat.fga - averageSeasonStat.fg3a).toFixed(1)}</th>
                  <th>{((averageSeasonStat.fgm - averageSeasonStat.fg3m) * 100 / (averageSeasonStat.fga - averageSeasonStat.fg3a)).toFixed(1)}%</th>
                  <th>{averageSeasonStat.fg3m.toFixed(1)}</th>
                  <th>{averageSeasonStat.fg3a.toFixed(1)}</th>
                  <th>{(averageSeasonStat.fg3_pct * 100).toFixed(1)}%</th>
                  <th>{averageSeasonStat.ftm.toFixed(1)}</th>
                  <th>{averageSeasonStat.fta.toFixed(1)}</th>
                  <th>{(averageSeasonStat.ft_pct * 100).toFixed(1)}%</th>
                  <th>{averageSeasonStat.oreb.toFixed(1)}</th>
                  <th>{averageSeasonStat.dreb.toFixed(1)}</th>
                  <th>{averageSeasonStat.reb.toFixed(1)}</th>
                  <th>{averageSeasonStat.ast.toFixed(1)}</th>
                  <th>{averageSeasonStat.stl.toFixed(1)}</th>
                  <th>{averageSeasonStat.blk.toFixed(1)}</th>
                  <th>{averageSeasonStat.turnover.toFixed(1)}</th>
                  <th>{averageSeasonStat.pf.toFixed(1)}</th>
                  <th>{averageSeasonStat.pts.toFixed(1)}</th>
                </tr>
              </tbody>
            </table>
            <div className={style.stat__datailed} onClick={showDetailedStats}>
              <div className={style.stat__datailed_head}>
                <h2>Detailed description of each game</h2>
                <div className={style.stat__datailed_arrow}><img src={arrow} alt="arrow" /></div>
              </div>
              <div className={style.stat__datailed_games}>
                {isSeasonsStat && seasonStats.map(game => (
                  <div key={game.id}>{game.game.date.slice(0, 10)}</div>
                ))}
              </div>
            </div>
          </div> :
          selectedYear !== 'Choose season' && averageSeasonStat === undefined ?
            <div className={style.wrong}>
              <h2 className={style.wrong__title}>There aren't stats for this season</h2>
            </div> :
            <></>
        }

      </div>
    </div>
  )
}
