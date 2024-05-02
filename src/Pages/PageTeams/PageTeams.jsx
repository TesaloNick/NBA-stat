import React, { useEffect, useState } from 'react'
import style from './PageTeams.module.scss'
import axios from 'axios';
import Spinner from '../Spinner/Spinner'
import Teams from '../../Elements/Teams/Teams';
import Select from '../../Elements/Select/Select';

export default function PageTeams() {
  const [teams, setTeams] = useState(false)
  const [selectedType, setSelectedType] = useState("division")

  useEffect(() => {
    axios.get(`https://api.balldontlie.io/v1/teams?per_page=30`, {
      headers: { Authorization: '4f56a15d-cc2a-4aa0-beb4-c70c6166fcf3' }
    }).then(res => {
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

      dataTeams.forEach(item => {
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

  function changeType(event) {
    setSelectedType(event.target.value);
  }

  if (!teams) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <Select change={changeType} value={selectedType} list={['conference', 'division']} />
      {selectedType === 'division' ?
        <Teams collections={teams.divisions} /> :
        <Teams collections={teams.conferences} />
      }
    </div>
  )
}
