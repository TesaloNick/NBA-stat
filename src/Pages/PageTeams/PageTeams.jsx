import React, { useEffect, useState } from 'react'
import style from './PageTeams.module.scss'
import axios from 'axios';
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom';


export default function PageTeams() {
  const [teams, setTeams] = useState(false)
  const [selectType, setSelectType] = useState("division")

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/teams?per_page=30`)
      .then(res => {
        const dataTeams = res.data.data

        let teamsObj = {
          conferences: [
            { name: 'Western', teams: [] },
            { name: 'Eastern', teams: [] },
          ],
          divisions: [
            { name: 'Southwest', teams: [] },
            { name: 'Northwest', teams: [] },
            { name: 'Pacific', teams: [] },
            { name: 'Southeast', teams: [] },
            { name: 'Atlantic', teams: [] },
            { name: 'Central', teams: [] },
          ],
        }

        dataTeams.map(item => {
          if (item.conference === 'East') teamsObj.conferences[1].teams = [...teamsObj.conferences[1].teams, item]
          if (item.conference === 'West') teamsObj.conferences[0].teams = [...teamsObj.conferences[0].teams, item]
          if (item.division === 'Southwest') teamsObj.divisions[0].teams = [...teamsObj.divisions[0].teams, item]
          if (item.division === 'Northwest') teamsObj.divisions[1].teams = [...teamsObj.divisions[1].teams, item]
          if (item.division === 'Pacific') teamsObj.divisions[2].teams = [...teamsObj.divisions[2].teams, item]
          if (item.division === 'Southeast') teamsObj.divisions[3].teams = [...teamsObj.divisions[3].teams, item]
          if (item.division === 'Atlantic') teamsObj.divisions[4].teams = [...teamsObj.divisions[4].teams, item]
          if (item.division === 'Central') teamsObj.divisions[5].teams = [...teamsObj.divisions[5].teams, item]
        })

        setTeams(teamsObj)
      })
  }, [])

  function changeList(event) {
    setSelectType(event.target.value);
  }

  if (!teams) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <select name="" id="" onChange={changeList} value={selectType} className={style.select}>
        <option className={style.select__option} value="conference">conference</option>
        <option className={style.select__option} value="division" >division</option>
      </select>
      {selectType === 'division' ?
        teams.divisions.map(division => (
          <div className={style.section} key={division.name}>
            <div className={style.section__name}>{division.name}</div>
            <div className={style.teams}>
              {division.teams.map(team => (
                <div className={style.teams__team} key={team.id}>
                  <Link to={'/team/' + team.id} className={style.teams__logo_wrapper}>
                    <img src={`/teams-logo-images/${team.abbreviation}-2023.png`} alt="" />
                  </Link>
                  {/* <div className={style.teams__name}>{team.full_name}</div> */}
                </div>
              ))}
            </div>
          </div>
        )) :
        teams.conferences.map(conference => (
          <div className={style.section} key={conference.name}>
            <div className={style.section__name}>{conference.name}</div>
            <div className={style.teams}>
              {conference.teams.map(team => (
                <div className={style.teams__team} key={team.id}>
                  <Link to={'/team/' + team.id} className={style.teams__logo_wrapper}>
                    <img src={`/teams-logo-images/${team.abbreviation}-2023.png`} alt="" />
                  </Link>
                  {/* <div className={style.teams__name}>{team.full_name}</div> */}
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  )
}
