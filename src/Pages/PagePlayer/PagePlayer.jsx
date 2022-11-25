import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './PagePlayer.module.scss'
import close from '../../assets/images/close.png'
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import sortDate from '../../Elements/SortDate';
import { useSelector } from 'react-redux'
import SelectSeason from '../../Elements/Select/Select';

export default function PagePlayer() {
  const { id } = useParams()
  const [selectedYear, setSelectedYear] = useState('2022-2023')
  const [dataStats, setDataStats] = useState({
    isModal: false,
    seasonStats: []
  })
  const averageTableHead = ['Season', 'G', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', ' BLK', 'TOV', 'PF', 'PTS']
  const tableHead = ['DATE', 'OPP', 'MP', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', ' BLK', 'TOV', 'PF', 'PTS']
  const { playerInfo, averageSeasonStat, isModal, seasonStats } = dataStats
  const getPlayerInfo = useSelector(state => state.player.players.filter(item => +item.id === +id))
  const seasons = useSelector(state => state.seasons.seasons)
  const teams = useSelector(state => state.teams.teams)

  useEffect(() => {
    const requestPlayerInfo = axios.get(`https://www.balldontlie.io/api/v1/players/${id}`);
    const requestSeasonStat = axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${selectedYear.slice(0, 4)}-10-01&end_date=${selectedYear.slice(5, 9)}-07-01&postseason=false`);

    if (getPlayerInfo.length === 0) {
      axios.all([requestPlayerInfo, requestSeasonStat])
        .then(axios.spread((...responses) => {
          const resPlayerInfo = responses[0].data
          const data = responses[1].data.data
          setDataStats({
            ...dataStats,
            playerInfo: resPlayerInfo,
            averageSeasonStat: getAverageStat(data).averageSeasonStat,
            seasonStats: getAverageStat(data).seasonStats
          })
        }))
    } else {
      getFullStat(selectedYear)
    }
  }, [])

  async function getFullStat(season) {
    axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&per_page=100&start_date=${season.slice(0, 4)}-10-01&end_date=${season.slice(5, 9)}-07-01&postseason=false`)
      .then(res => {
        const data = res.data.data
        data.length === 0 ?
          setDataStats({
            ...dataStats,
            averageSeasonStat: false,
          }) :
          setDataStats({
            ...dataStats,
            playerInfo: playerInfo ? playerInfo : getPlayerInfo[0].playerInfo,
            averageSeasonStat: getAverageStat(data).averageSeasonStat,
            seasonStats: getAverageStat(data).seasonStats
          })
      })
  }

  function getAverageStat(data) {
    const seasonStats = sortDate(data).filter(game => game.min !== '0:00' && game.min !== "" && game.min !== "00" && game.min)
    const numberOfGames = seasonStats.length

    var averageStats = {};
    seasonStats.forEach((gameStats, index) => {
      for (var p in gameStats) {
        if (gameStats.hasOwnProperty(p) && p !== 'player' && p !== 'game' && p !== 'team' && p !== 'id' && p !== 'fg3_pct' && p !== 'fg_pct' && p !== 'ft_pct') {
          if (index === numberOfGames - 1) {
            averageStats[p] = (averageStats[p] + +gameStats[p]) / numberOfGames;
            averageStats.games_played = numberOfGames
          } else {
            averageStats[p] = averageStats[p] || 0;
            averageStats[p] += +gameStats[p];
          }
        }
      }
    });

    return {
      averageSeasonStat: averageStats,
      seasonStats: seasonStats
    }
  }

  function changeSeason(event) {
    setSelectedYear(event.target.value)
    getFullStat(event.target.value)
  }

  async function showDetailedStats() {
    setDataStats({
      ...dataStats,
      isModal: true,
    })
  }

  if (!playerInfo || !seasonStats) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <SelectSeason change={changeSeason} value={selectedYear} list={seasons} />
      <div className={style.player}>
        <Link to={`/team/${playerInfo.team.id}`} className={style.player__logo}>
          <img src={`/images/teams-logo-images/${playerInfo.team.abbreviation}-2023.png`} alt="" />
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
          <>
            <div className={style.stat__average}>
              <table className={style.averageTable}>
                <caption className={style.averageTable__title}>Average stat in season {selectedYear}</caption>
                <tbody className={style.averageTable__type}>
                  <tr className={style.averageTable__row}>
                    {averageTableHead.map(item => <th key={item}>{item}</th>)}
                  </tr>
                </tbody>
                <tbody className={style.averageTable__type}>
                  <tr className={style.averageTable__row}>
                    <td>{selectedYear}</td>
                    <td>{averageSeasonStat.games_played.toFixed(0)}</td>
                    {/* <td>{averageSeasonStat.min.toFixed(0)}:{(averageSeasonStat.min % 1 * 60).toFixed(0)}</td> */}
                    <td>{(averageSeasonStat.fgm - averageSeasonStat.fg3m).toFixed(1)}</td>
                    <td>{(averageSeasonStat.fga - averageSeasonStat.fg3a).toFixed(1)}</td>
                    <td>{((averageSeasonStat.fgm - averageSeasonStat.fg3m) / (averageSeasonStat.fga - averageSeasonStat.fg3a)).toFixed(2)}</td>
                    <td>{averageSeasonStat.fg3m.toFixed(1)}</td>
                    <td>{averageSeasonStat.fg3a.toFixed(1)}</td>
                    <td>{(averageSeasonStat.fg3m / averageSeasonStat.fg3a).toFixed(2)}</td>
                    <td>{averageSeasonStat.ftm.toFixed(1)}</td>
                    <td>{averageSeasonStat.fta.toFixed(1)}</td>
                    <td>{(averageSeasonStat.ftm / averageSeasonStat.fta).toFixed(2)}</td>
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
            </div>
            <div className={style.stat__detailed} onClick={showDetailedStats}>
              <h2 className={style.stat__detailed_head}>Detailed description of each game</h2>
            </div>
          </> :
          <div className={style.wrong}>
            <h2 className={style.wrong__title}>There aren't stats for this season</h2>
          </div>
        }
      </div>
      <div className={
        isModal ?
          `${style.modal} ${style.active}` :
          style.modal
      } onClick={() => setDataStats({ ...dataStats, isModal: false })}>
        <div className={style.modal__wrapper}>
          <div className={style.modal__close} onClick={() => setDataStats({ ...dataStats, isModal: false })}>
            <img src={close} alt="" />
          </div>
          <table className={style.statsTable}>
            <caption>
              Detailed description season {selectedYear}
            </caption>
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
                    (<Link to={`/team/${game.game.visitor_team_id}`}>{teams.find(item => item.id === game.game.visitor_team_id).abbreviation}</Link>) :
                    (<Link to={`/team/${game.game.home_team_id}`}>{teams.find(item => item.id === game.game.home_team_id).abbreviation}</Link>)
                  }</td>
                  <td>{game.min}</td>
                  <td>{(game.fgm - game.fg3m).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a).toFixed(0)}</td>
                  <td>{(game.fga - game.fg3a) !== 0 ?
                    ((game.fgm - game.fg3m) / (game.fga - game.fg3a)).toFixed(2) :
                    '0.00'
                  }</td>
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
