import React, { useEffect, useState } from 'react'
import style from './PageStanding.module.scss'
import axios from 'axios';

export default function PageStanding() {
  const seasons = [2021, 2020, 2019, 2018, 2017, 2016, 2015]
  const [dataStandingTable, setdataStandingTable] = useState([])
  const teamIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

  useEffect(() => {
    // const options = {
    //   method: 'GET',
    //   url: 'https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=15&per_page=100&postseason=false',
    // };

    // axios.request(options)
    //   .then(res => {
    //     let data = res.data.data
    //     data = data.sort((a, b) => a.id - b.id)
    //     return setdataStandingTable(res.data.data)
    //   })
    //   .catch((error) => console.error(error));

    let teamsInfo = []
    teamIDs.map(async teamID => {
      axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${teamID}&per_page=100&postseason=false&start_date=2021-10-01`)
        .then(res => {
          let wins = 0
          let logo = ''
          res.data.data.map(item => {
            if (item.status === "Final") {
              if (item.home_team.id === teamID) {
                logo = item.home_team.abbreviation
                if (item.home_team_score > item.visitor_team_score) wins++
              } else {
                logo = item.visitor_team.abbreviation
                if (item.visitor_team_score > item.home_team_score) wins++
              }
            }
          })
          teamsInfo = [...teamsInfo, {
            wins,
            losses: 82 - wins,
            logo: `/teams-logo-images/${logo}-2023.png`
          }]
          setdataStandingTable(teamsInfo)
        })
    })
  }, [])
  console.log(dataStandingTable);

  async function getInfo() {
    const id = 15
    return await axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${id}&per_page=100&postseason=false&start_date=2021-10-01`)
      .then(res => {
        let wins = 0
        res.data.data.map(item => {
          if (item.status === "Final") {
            if (item.home_team.id === id) {
              if (item.home_team_score > item.visitor_team_score) wins++
            } else {
              if (item.visitor_team_score > item.home_team_score) wins++
            }
          }
        })
        console.log(wins);
        return wins
      })
  }

  return (
    <div className={style.standing}>
      <form className={style.standing__form}>
        <select className={style.standing__select_seasons}>{seasons.map(season =>
          <option className={style.standing__select_season} key={season} value={season}>{season}</option>
        )}</select>
      </form>

      <div className={style.table}>
        {dataStandingTable.map((team, index) => (
          <div key={index}>
            <div className={style.table__logo}><img className={style.table__logo_img} src={team.logo} alt="" /></div>
            <div className={style.table__name}>{team.wins}</div>
            <div className={style.table__win}>{team.losses}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
