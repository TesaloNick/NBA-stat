import React, { useEffect, useState, useContext } from 'react'
import style from './PageTeam.module.scss'
import axios from 'axios';
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner'
import { useParams, Link } from 'react-router-dom';
import sortDate from '../../Elements/SortDate';
import SelectSeason from '../../Elements/SelectSeason/SelectSeason';

export default function PageTeam() {
  const { id } = useParams()
  const [selectedYear, setSelectedYear] = useState('2022-2023')
  const [teamInfo, setTeamInfo] = useState(false)
  const [seasonInfo, setSeasonInfo] = useState({
    isModal: false,
    seasonStats: []
  })
  const { isModal, seasonStats } = seasonInfo
  const { isStatExist, teamInfoSeason } = teamInfo
  // const dataContext = useContext(contextData)
  const tableHead = ['DATE', 'Visitor team', 'Score', '@', 'Score', 'Home team', 'Box Score', 'W/L']

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=${selectedYear.slice(0, 4)}&team_ids[]=${id}&per_page=100&postseason=false&start_date=${selectedYear.slice(0, 4)}-10-01`)
      .then(res => {
        let data = sortDate(res.data.data)

        if (data.length === 0) {
          setTeamInfo({ ...teamInfo, isStatExist: false })
        } else {
          setSeasonInfo({ ...seasonInfo, seasonStats: data })

          let wins = 0, losses = 0, abbreviation = '', name = ''
          data.map(item => {
            if (item.status === "Final") {
              if (item.home_team.id == id) {
                abbreviation = item.home_team.abbreviation
                name = item.home_team.full_name
                item.home_team_score > item.visitor_team_score ? wins++ : losses++
              } else {
                item.visitor_team_score > item.home_team_score ? wins++ : losses++
              }
            }
          })

          setTeamInfo({
            isStatExist: true,
            teamInfoSeason: {
              name,
              abbreviation,
              wins,
              losses,
            }
          })
        }
      })
  }, [selectedYear])

  async function showDetailedStats() {
    setSeasonInfo({ ...seasonInfo, isModal: true })
  }


  function changeSeason(event) {
    setSelectedYear(event.target.value);
  }

  if (!teamInfo || !selectedYear) {
    return (<Spinner />)
  }

  console.log(teamInfo, isStatExist, selectedYear, seasonInfo);

  return (
    <div className={style.wrapper}>
      <SelectSeason changeSeason={changeSeason} selectedYear={selectedYear} />
      <div className={style.team}>
        <div className={style.team__logo_wrapper}>
          <img className={style.team__logo} src={`/teams-logo-images/${teamInfoSeason.abbreviation}-2023.png`} alt="" />
        </div>
        <h2 className={style.team__name}>{teamInfoSeason.name}</h2>
        {isStatExist ?
          <div className={style.stat}>
            <div className={style.stat__digits}>
              <p className={style.stat__digit}>{'Season: ' + selectedYear}</p>
              <p className={style.stat__digit}>{'Wins: ' + teamInfoSeason.wins}</p>
              <p className={style.stat__digit}>{'Losses: ' + teamInfoSeason.losses}</p>
            </div>
            <div className={style.stat__detailed} onClick={showDetailedStats}>
              <h2 className={style.stat__detailed_head}>Detailed description of each game</h2>
            </div>
          </div> :
          <div>
            <h1 className={style.stat__wrong}>Team don't exist yet</h1>
          </div>
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
                {tableHead.map((item, index) => <th key={index}>{item}</th>)}
              </tr>
            </thead>
            <tbody className={style.statsTable__type}>
              {seasonStats.map(game => (
                <tr className={style.statsTable__row} key={game.id}>
                  <td><Link to={`/game/${game.id}`}>{game.date.slice(0, 10)}</Link></td>
                  <td>{game.visitor_team.id === id ?
                    game.visitor_team.full_name :
                    <Link to={`/team/${game.visitor_team.id}`}>{game.visitor_team.full_name}</Link>
                  }</td>
                  <td>{game.visitor_team_score ?
                    game.visitor_team_score :
                    '-'}</td>
                  <td>@</td>
                  <td>{game.home_team_score ?
                    game.home_team_score :
                    '-'}</td>
                  <td>{game.home_team.id === id ?
                    game.home_team.full_name :
                    <Link to={`/team/${game.home_team.id}`}>{game.home_team.full_name}</Link>
                  }</td>
                  <td><Link to={`/game/${game.id}`}>Box Score</Link></td>
                  <td>{
                    id == game.visitor_team.id && game.visitor_team_score > game.home_team_score ?
                      'W' : id == game.home_team.id && game.home_team_score > game.visitor_team_score ?
                        'W' : game.home_team_score != '0' ?
                          'L' : '-'
                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}
