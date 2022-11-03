import React, { useEffect, useState, useContext } from 'react'
import style from './PageTeam.module.scss'
import axios from 'axios';
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner'
import { useParams, Link } from 'react-router-dom';
import backImage from '../../assets/images/arrow.png'


export default function PageTeam() {
  const { id } = useParams()
  const [teamInfo, setTeamInfo] = useState(false)
  const [isStat, setIsStat] = useState(false)
  const [isStatExist, setIsStatExist] = useState(true)
  const [selectedYear, setSelectedYear] = useState('Choose season')
  const dataContext = useContext(contextData)

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/teams/${id}`)
      .then(res => {
        setTeamInfo({
          abbreviation: res.data.abbreviation,
          name: res.data.full_name
        })
      })
  }, [])

  useEffect(() => {
    if (selectedYear !== 'Choose season') {
      setIsStat(true)

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

            setTeamInfo({
              ...teamInfo,
              wins,
              losses: losses
            })
          }
        })
    }
  }, [selectedYear])

  function changeList(event) {
    setSelectedYear(event.target.value);
  }

  if (!teamInfo || !selectedYear) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <Link to='/teams' className={style.back}><img src={backImage} alt="" /></Link>
      <select name="" id="" onChange={changeList} value={selectedYear} className={style.select}>
        <option className={style.select__option} value={'Choose season'} key={'Choose season'} >{'Choose season'}</option>
        {dataContext.seasons.map(year => (
          <option className={style.select__option} value={year} key={year} >{year}</option>
        ))}
      </select>
      <div className={style.team}>
        <div className={style.team__logo_wrapper}>
          <img className={style.team__logo} src={`/teams-logo-images/${teamInfo.abbreviation}-2023.png`} alt="" />
        </div>
        <h2 className={style.team__name}>{teamInfo.name}</h2>
        {isStat ?
          isStatExist ?
            <div className={style.stat}>
              <p className={style.stat__digit}>{'Season: ' + selectedYear}</p>
              <p className={style.stat__digit}>{'Wins: ' + teamInfo.wins}</p>
              <p className={style.stat__digit}>{'Losses: ' + teamInfo.losses}</p>
            </div> :
            <div>
              <h1 className={style.stat__wrong}>Team don't exist yet</h1>
            </div> :
          <></>
        }

      </div>
    </div>
  )
}
