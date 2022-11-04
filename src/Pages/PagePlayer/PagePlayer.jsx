import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PagePlayer.module.scss'
import close from '../../assets/images/close.png'
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

export default function PagePlayer() {
  const { id } = useParams()
  const dataContext = useContext(contextData)
  const [playerInfo, setPlayerInfo] = useState(false)
  const [selectedYear, setSelectedYear] = useState('Choose season')
  const [averageSeasonStat, setAverageSeasonStat] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [seasonStats, setSeasonStats] = useState([])

  useEffect(() => {
    if (!dataContext.searchedPlayer) {
      axios.get(`https://www.balldontlie.io/api/v1/players/${id}`)
        .then(res => setPlayerInfo(res.data))
    } else {
      setPlayerInfo(dataContext.searchedPlayer)
    }
  }, [])

  function changeList(event) {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${event.target.value.slice(0, 4)}&player_ids[]=${id}`)
      .then(res => setAverageSeasonStat(res.data.data[0]))

    // setIsModal(false)
    setSelectedYear(event.target.value);
  }

  async function showDetailedStats() {
    setIsModal(!isModal)

    axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${selectedYear.slice(0, 4)}-10-01&end_date=${+selectedYear.slice(0, 4) + 1}-07-01&postseason=false`)
      .then(res => {
        setSeasonStats(res.data.data
          .filter(game => game.min !== '0:00' && game.min !== "" && game.min !== "00")
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
  console.log(isModal);

  if (!playerInfo) {
    return (<Spinner />)
  }
  console.log(seasonStats);

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
            <table className={style.averageTable}>
              <tbody className={style.averageTable__type}>
                <tr className={style.averageTable__row}>
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
              <tbody className={style.averageTable__type}>
                <tr className={style.averageTable__row}>
                  <td>{averageSeasonStat.season}-{+averageSeasonStat.season + 1}</td>
                  <td>{averageSeasonStat.games_played.toFixed(0)}</td>
                  <td>{averageSeasonStat.min}</td>
                  <td>{(averageSeasonStat.fgm - averageSeasonStat.fg3m).toFixed(1)}</td>
                  <td>{(averageSeasonStat.fga - averageSeasonStat.fg3a).toFixed(1)}</td>
                  <td>{((averageSeasonStat.fgm - averageSeasonStat.fg3m) * 100 / (averageSeasonStat.fga - averageSeasonStat.fg3a)).toFixed(1)}%</td>
                  <td>{averageSeasonStat.fg3m.toFixed(1)}</td>
                  <td>{averageSeasonStat.fg3a.toFixed(1)}</td>
                  <td>{(averageSeasonStat.fg3_pct * 100).toFixed(1)}%</td>
                  <td>{averageSeasonStat.ftm.toFixed(1)}</td>
                  <td>{averageSeasonStat.fta.toFixed(1)}</td>
                  <td>{(averageSeasonStat.ft_pct * 100).toFixed(1)}%</td>
                  <td>{averageSeasonStat.oreb.toFixed(1)}</td>
                  <td>{averageSeasonStat.dreb.toFixed(1)}</td>
                  <td>{averageSeasonStat.reb.toFixed(1)}</td>
                  <td>{averageSeasonStat.ast.toFixed(1)}</td>
                  <td>{averageSeasonStat.stl.toFixed(1)}</td>
                  <td>{averageSeasonStat.blk.toFixed(1)}</td>
                  <td>{averageSeasonStat.turnover.toFixed(1)}</td>
                  <td>{averageSeasonStat.pf.toFixed(1)}</td>
                  <td>{averageSeasonStat.pts.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
            <div className={style.stat__detailed} onClick={showDetailedStats}>
              <h2 className={style.stat__detailed_head}>Detailed description of each game</h2>
            </div>

          </div> :
          selectedYear !== 'Choose season' && averageSeasonStat === undefined ?
            <div className={style.wrong}>
              <h2 className={style.wrong__title}>There aren't stats for this season</h2>
            </div> :
            <></>
        }
      </div>
      <div className={
        isModal ?
          `${style.modal} ${style.active}` :
          style.modal
      } onClick={() => { setIsModal(false) }}>
        <div className={style.modal__wrapper} onClick={(event) => event.stopPropagation()}>
          <div className={style.modal__close}><img src={close} alt="close modal" /></div>
          <h2>Detailed description of each game in season {selectedYear}</h2>
          <table className={style.statsTable}>
            <thead className={style.statsTable__type}>
              <tr className={style.statsTable__row}>
                <th>DATE</th>
                <th>OPP</th>
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
            </thead>
            <tbody className={style.statsTable__type}>
              {seasonStats.map(game => (
                <tr className={style.statsTable__row} key={game.id}>
                  <td>
                    <Link to={`/game/${game.game.id}`}>{game.game.date.slice(0, 10)}</Link>
                  </td>
                  <td>{game.team.id === game.game.home_team_id ?
                    (<Link to={`/team/${game.game.visitor_team_id}`}>{dataContext.teams.find(item => item.id === game.game.visitor_team_id).abbreviation}</Link>) :
                    (<Link to={`/team/${game.game.home_team_id}`}>{dataContext.teams.find(item => item.id === game.game.home_team_id).abbreviation}</Link>)
                  }</td>
                  <td>{game.min}</td>
                  <td>{(game.fgm - game.fg3m).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a) !== 0 ? ((game.fgm - game.fg3m) / (game.fga - game.fg3a) * 100).toFixed(1) : '0.0'}%</td>
                  <td>{game.fg3m.toFixed(0)}</td>
                  <td>{game.fg3a.toFixed(0)}</td>
                  <td>{game.fg3_pct.toFixed(1)}%</td>
                  <td>{game.ftm.toFixed(0)}</td>
                  <td>{game.fta.toFixed(0)}</td>
                  <td>{game.ft_pct.toFixed(1)}%</td>
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
      </div>
    </div >
  )
}
