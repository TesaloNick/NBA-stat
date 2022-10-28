import React, { useEffect, useState, useContext } from 'react'
import style from './PageTeam.module.scss'
import axios from 'axios';
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner'
import { useParams, Link } from 'react-router-dom';
import backImage from '../../assets/images/back.png'


export default function PageTeam() {
  const { id } = useParams()
  const [teamStat, setTeamStat] = useState(false)
  const [isStatExist, setIsStatExist] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2021-2022')
  const dataContext = useContext(contextData)

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=${selectedYear.slice(0, 4)}&team_ids[]=${id}&per_page=100&postseason=false&start_date=${selectedYear.slice(0, 4)}-10-01`)
      .then(res => {
        if (res.data.data.length === 0) {
          setIsStatExist(false)
        } else {
          setIsStatExist(true)

          let wins = 0
          let losses = 0
          let abbreviation = ''
          let name = ''
          res.data?.data.map(item => {
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

          setTeamStat({
            wins,
            losses: losses,
            abbreviation,
            name
          })
        }
      })
  }, [selectedYear])

  function changeList(event) {
    setSelectedYear(event.target.value);
  }

  if (!teamStat) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <Link to='/teams' className={style.back}><img src={backImage} alt="" /></Link>
      <select name="" id="" onChange={changeList} value={selectedYear} className={style.select}>
        {dataContext.seasons.map(year => (
          <option className={style.select__option} value={year} key={year} >{year}</option>
        ))}
      </select>
      <div className={style.team}>
        <div className={style.team__logo_wrapper}>
          <img className={style.team__logo} src={`/teams-logo-images/${teamStat.abbreviation}-2023.png`} alt="" />
        </div>
        <h2 className={style.team__name}>{teamStat.name}</h2>
        {isStatExist ?
          <div className={style.stat}>
            <p className={style.stat__digit}>{'Season: ' + selectedYear}</p>
            <p className={style.stat__digit}>{'Wins: ' + teamStat.wins}</p>
            <p className={style.stat__digit}>{'Losses: ' + teamStat.losses}</p>
          </div> :
          <div>
            <h1 className={style.stat__wrong}>Team don't exist yet</h1>
          </div>
        }
      </div>
    </div>
  )
}
