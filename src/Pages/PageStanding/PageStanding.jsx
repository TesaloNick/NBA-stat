import React, { useEffect, useState } from 'react'
import style from './PageStanding.module.scss'
import axios from 'axios';

export default function PageStanding() {
  const seasons = [2021, 2020, 2019, 2018, 2017, 2016, 2015]
  const [dataStandingTable, setdataStandingTable] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/standings',
      params: { league: 'standard', season: '2021' },
      headers: {
        'X-RapidAPI-Key': 'ce84889158msh60600aa7ca1713ap1d994bjsn762debf01314',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(res => setdataStandingTable(res.data.response))
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

      <table className={style.table}>
        {dataStandingTable.map((row, index) => (
          // <div key={index} className={style.table__row}>
          <>
            <div className={style.table__logo}><img className={style.table__logo_img} src={row.team.logo} alt="" /></div>
            <div className={style.table__name}>{row.team.name}</div>
            <div className={style.table__win}>{row.win.total}</div>
            <div className={style.table__loss}>{row.loss.total}</div>
          </>
        ))}
      </table>
    </div>
  )
}
