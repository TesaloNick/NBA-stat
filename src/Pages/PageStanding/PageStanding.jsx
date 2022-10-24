import React, { useEffect, useState } from 'react'
import style from './PageStanding.module.scss'
import axios from 'axios';

export default function PageStanding() {
  const seasons = [2021, 2020, 2019, 2018, 2017, 2016, 2015]
  const [dataStandingTable, setdataStandingTable] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://www.balldontlie.io/api/v1/games?team_ids[]=14&per_page=100&seasons[]=2021',
    };

    axios.request(options)
      .then(res => {
        let data = res.data.data
        data = data.sort((a, b) => a.id - b.id)
        return setdataStandingTable(res.data.data)
      })
      .catch((error) => console.error(error));
  }, [])
  console.log(dataStandingTable);

  return (
    <div className={style.standing}>
      <form className={style.standing__form}>
        <select className={style.standing__select_seasons}>{seasons.map(season =>
          <option className={style.standing__select_season} key={season} value={season}>{season}</option>
        )}</select>
      </form>

      <div className={style.table}>
        {dataStandingTable.map((row, index) => (
          // <div key={index} className={style.table__row}>
          <div key={index}>
            {/* <div className={style.table__logo}><img className={style.table__logo_img} src={row.team.logo} alt="" /></div> */}
            <div className={style.table__name}>{row.date}</div>
            {/* <div className={style.table__win}>{row.win.total}</div>
            <div className={style.table__loss}>{row.loss.total}</div> */}
          </div>
        ))}
      </div>
    </div>
  )
}
