import React, { useEffect, useState } from 'react'
import style from './PageTeam.module.scss'
import axios from 'axios';
import Spinner from '../Spinner/Spinner'
import { useParams, Link } from 'react-router-dom';
import backImage from '../../assets/images/back.png'


export default function PageTeam() {
  const { id } = useParams()
  const [teamStat, setTeamStat] = useState(false)
  const [isStatExist, setIsStatExist] = useState(true)
  const [selectedYear, setSelectedYear] = useState(2021)
  const [yearsArr, setYearsArr] = useState([2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979])

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=${selectedYear}&team_ids[]=${id}&per_page=100&postseason=false&start_date=${selectedYear}-10-01`)
      .then(res => {
        if (res.data.data.length === 0) {
          setIsStatExist(false)
        } else {
          setIsStatExist(true)

          let wins = 0
          let abbreviation = ''
          let name = ''
          console.log(res.data.data);
          res.data?.data.map(item => {
            if (item.status === "Final") {
              if (item.home_team.id == id) {
                abbreviation = item.home_team.abbreviation
                name = item.home_team.full_name
                if (item.home_team_score > item.visitor_team_score) wins++
              } else {
                if (item.visitor_team_score > item.home_team_score) wins++
              }
            }
          })

          setTeamStat({
            wins,
            losses: 82 - wins,
            abbreviation,
            name
          })
        }
      })
  }, [selectedYear])

  console.log(teamStat);

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
        {yearsArr.map(year => (
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
