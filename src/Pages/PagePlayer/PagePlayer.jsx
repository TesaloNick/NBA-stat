import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PagePlayer.module.scss'
import close from '../../assets/images/close.png'
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import sortDate from '../../Elements/SortDate';

export default function PagePlayer() {
  const { id } = useParams()
  const dataContext = useContext(contextData)
  const [playerStat, setPlayerStat] = useState(false)
  const [seasonInfo, setSeasonInfo] = useState({
    isModal: false,
    seasonStats: []
  })
  const averageTableHead = ['Season', 'G', 'MP', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', ' BLK', 'TOV', 'PF', 'PTS']
  const tableHead = ['DATE', 'OPP', 'MP', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', ' BLK', 'TOV', 'PF', 'PTS']
  const { selectedYear, playerInfo, averageSeasonStat } = playerStat
  const { isModal, seasonStats } = seasonInfo

  useEffect(() => {
    const requestPlayerInfo = axios.get(`https://www.balldontlie.io/api/v1/players/${id}`);
    const requestAverageSeasonStat = axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${id}`);

    if (!dataContext.searchedPlayer) {
      axios.all([requestPlayerInfo, requestAverageSeasonStat])
        .then(axios.spread((...responses) => {
          const responsePlayerInfo = responses[0].data
          const responseAverageSeasonStat = responses[1].data.data[0]

          setPlayerStat({
            selectedYear: '2022-2023',
            playerInfo: responsePlayerInfo,
            averageSeasonStat: responseAverageSeasonStat
          })
        }))
    } else {
      axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${id}`)
        .then(response => {
          const responseAverageSeasonStat = response.data.data[0]

          setPlayerStat({
            selectedYear: '2022-2023',
            playerInfo: dataContext.searchedPlayer,
            averageSeasonStat: responseAverageSeasonStat,
          })
        })
    }
  }, [])

  function changeList(event) {
    setPlayerStat({
      ...playerStat,
      selectedYear: event.target.value
    })

    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${event.target.value.slice(0, 4)}&player_ids[]=${id}`)
      .then(res => setPlayerStat({
        ...playerStat,
        selectedYear: event.target.value,
        averageSeasonStat: res.data.data[0],
      }))
  }

  async function showDetailedStats() {
    axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${selectedYear.slice(0, 4)}-10-01&end_date=${+selectedYear.slice(0, 4) + 1}-07-01&postseason=false`)
      .then(res => {
        console.log(res.data.data);
        setSeasonInfo({
          isModal: true,
          seasonStats: sortDate(res.data.data)
            .filter(game => game.min !== '0:00' && game.min !== "" && game.min !== "00" && game.min)
        })
      })
  }

  if (!playerStat) {
    return (<Spinner />)
  }
  console.log(playerStat, seasonInfo);

  return (
    <div className={style.wrapper}>
      <select name="" id="" onChange={changeList} value={selectedYear} className={style.select} >
        {dataContext.seasons.map(year => (
          <option className={style.select__option} value={year} key={year} >{year}</option>
        ))}
      </select>
      <div key={playerInfo.id} className={style.player}>
        <Link to={`/team/${playerInfo.team.id}`} className={style.player__logo_wrapper}>
          <img src={`/teams-logo-images/${playerInfo.team.abbreviation}-2023.png`} alt="" />
        </Link>
        <div className={style.player__info}>
          <div className={style.player__name}><b>{`${playerInfo.first_name} ${playerInfo.last_name}`}</b></div>
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
        {averageSeasonStat ?
          <div className={style.stat__average}>
            <table className={style.averageTable}>
              <caption className={style.averageTable__title}>Average stat in season {averageSeasonStat.season}-{+averageSeasonStat.season + 1}</caption>
              <tbody className={style.averageTable__type}>
                <tr className={style.averageTable__row}>
                  {averageTableHead.map(item => <th key={item}>{item}</th>)}
                </tr>
              </tbody>
              <tbody className={style.averageTable__type}>
                <tr className={style.averageTable__row}>
                  <td>{averageSeasonStat.season}-{+averageSeasonStat.season + 1}</td>
                  <td>{averageSeasonStat.games_played.toFixed(0)}</td>
                  <td>{averageSeasonStat.min}</td>
                  <td>{(averageSeasonStat.fgm - averageSeasonStat.fg3m).toFixed(1)}</td>
                  <td>{(averageSeasonStat.fga - averageSeasonStat.fg3a).toFixed(1)}</td>
                  <td>{((averageSeasonStat.fgm - averageSeasonStat.fg3m) / (averageSeasonStat.fga - averageSeasonStat.fg3a)).toFixed(2)}</td>
                  <td>{averageSeasonStat.fg3m.toFixed(1)}</td>
                  <td>{averageSeasonStat.fg3a.toFixed(1)}</td>
                  <td>{(averageSeasonStat.fg3_pct).toFixed(2)}</td>
                  <td>{averageSeasonStat.ftm.toFixed(1)}</td>
                  <td>{averageSeasonStat.fta.toFixed(1)}</td>
                  <td>{(averageSeasonStat.ft_pct).toFixed(2)}</td>
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
          averageSeasonStat === undefined ?
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
      } onClick={() => setSeasonInfo({ ...seasonInfo, isModal: false })}>
        <div className={style.modal__wrapper} onClick={(event) => event.stopPropagation()}>
          <table className={style.statsTable}>
            <caption>Detailed description of each game in season {selectedYear}</caption>
            <thead className={style.statsTable__type}>
              <tr className={style.statsTable__row}>
                {tableHead.map(item => <th key={item}>{item}</th>)}
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
                  <td>{(game.fga - game.fg3a) !== 0 ? ((game.fgm - game.fg3m) / (game.fga - game.fg3a)).toFixed(2) : '0.00'}</td>
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
      </div>
    </div >
  )
}
