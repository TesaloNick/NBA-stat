import React from 'react'
import style from './Teams.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addTeam } from '../../store/teamData';

export default function Teams({ collections }) {
  const dispatch = useDispatch()

  function chooseTeam(team) {
    console.log(team);
    dispatch(addTeam(team))
  }

  return (
    <div className={style.wrapper}>
      {collections.map(collection => (
        <div className={style.section} key={collection.name}>
          <div className={style.section__name}>{collection.name}</div>
          <div className={style.teams}>
            {collection.teams.map(team => (
              <div className={style.teams__team} key={team.id}>
                <Link to={'/team/' + team.id} className={style.teams__logo_wrapper} onClick={() => chooseTeam(team)}>
                  <img src={`/teams-logo-images/${team.abbreviation}-2023.png`} alt="" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
