import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import style from './PageSearchResult.module.scss'
import './PageSearchResult.scss'
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../../store/playerData';

export default function PageSearchResult() {
  const { searchedName } = useParams()
  const [playersInfo, setPlayersInfo] = useState(false)
  const dispatch = useDispatch();
  const playersSearchResult = useSelector(state => state.playersSearchResult.playersSearchResult)

  // pagination
  const [pagination, setPagination] = useState({
    currentItems: null,
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 18,
  });
  const { items, currentItems, pageCount, itemOffset, itemsPerPage } = pagination;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    if (!playersSearchResult) {
      axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchedName}&per_page=100`)
        .then(res => {
          const data = res.data.data;
          setPlayersInfo(data)
          setPagination({
            ...pagination,
            items: data,
            currentItems: data.slice(itemOffset, endOffset),
            pageCount: Math.ceil(data.length / itemsPerPage),
            itemOffset: 0,
          })
        })
    } else {
      setPlayersInfo(playersSearchResult.data)
      setPagination({
        ...pagination,
        items: playersSearchResult.data,
        currentItems: playersSearchResult.data.slice(itemOffset, endOffset),
        pageCount: Math.ceil(playersSearchResult.data.length / itemsPerPage),
        itemOffset: 0,
      })
    }
  }, [])
  console.log(currentItems, itemOffset);

  const handlePageClick = (event) => { // переключение пагинации
    const newOffset = (event.selected * itemsPerPage) % playersInfo.length;
    setPagination({
      ...pagination,
      itemOffset: newOffset,
      currentItems: items.slice(newOffset, newOffset + itemsPerPage),
    })
    console.log(items.slice(newOffset, itemOffset + itemsPerPage));
  };

  function savePlayerInfo(playerInfo) {
    dispatch(addPlayer(playerInfo))
  }

  if (!playersInfo || !currentItems) {
    return (<Spinner />)
  }

  return (
    <div className={style.wrapper}>
      <ReactPaginate
        containerClassName='pagination'
        onPageChange={handlePageClick}
        breakLabel="..."
        breakClassName={style.brea}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        nextLabel=">"
        renderOnZeroPageCount={null}
      />
      <div className={style.players_wrapper}>
        {currentItems.length > 0 ?
          currentItems.map(player => (
            <Link to={`/player/${player.id}`} key={player.id} className={`${style.player} ${style.effect_1}`} onClick={() => savePlayerInfo(player)}>
              <div className={style.player__logo_wrapper}>
                <img src={`/images/teams-logo-images/${player.team.abbreviation}-2023.png`} alt="" />
              </div>
              <div className={style.player__info}>
                <div className={style.player__text}><b>Name: </b>{`${player.first_name} ${player.last_name}`}</div>
                <div className={style.player__text}><b>Height: </b>
                  {player.height_feet ?
                    `${player.height_feet}-${player.height_inches}` :
                    '-'
                  }
                </div>
                <div className={style.player__text}><b>Weight: </b>
                  {player.weight_pounds ?
                    `${player.weight_pounds}lb` :
                    '-'
                  }
                </div>
                <div className={style.player__text}><b>Position: </b>
                  {player.position ?
                    player.position :
                    '-'
                  }
                </div>
                <div className={style.player__text}><b>Team: </b>{player.team.abbreviation}</div>
              </div>
            </Link>
          )) :
          <div className={style.wrong}>
            <h2 className={style.wrong__title}>There have never been such players in the NBA</h2>
          </div>
        }
      </div >
    </div>
  )
}
