import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import style from './PageSearchResult.module.scss'
import './PageSearchResult.scss'
import contextData from '../../Context/data';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default function PageSearchResult() {
  const { searchedName } = useParams()
  const dataContext = useContext(contextData)
  const [playersInfo, setPlayersInfo] = useState(false)
  // pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => { // создание пагинации
    if (playersInfo) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(playersInfo.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(playersInfo.length / itemsPerPage));
    }
  }, [itemOffset, playersInfo]);

  const handlePageClick = (event) => { // переключение пагинации
    const newOffset = (event.selected * itemsPerPage) % playersInfo.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (!dataContext.searchPlayersResult) {
      axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchedName}&per_page=100`)
        .then(res => setPlayersInfo(res.data.data))
    } else {
      setPlayersInfo(dataContext.searchPlayersResult)
    }
  }, [dataContext.searchPlayersResult])

  function savePlayerInfo(playerInfo) {
    dataContext.searchedPlayer = playerInfo
  }

  if (!playersInfo || !currentItems) {
    return (<Spinner />)
  }

  return (
    <>
      <ReactPaginate
        containerClassName='pagination'
        onPageChange={handlePageClick}
        breakLabel="..."
        breakClassName={style.brea}
        // breakLinkClassName='break__link'
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="<Previous>"
        nextLabel=">"
        renderOnZeroPageCount={null}
      />
      <div className={style.wrapper}>
        {
          currentItems.length > 0 ?
            currentItems.map(player => (
              <Link to={`/player/${player.id}`} key={player.id} className={`${style.player} ${style.effect_1}`} onClick={() => savePlayerInfo(player)}>
                <div className={style.player__logo_wrapper}>
                  <img src={`/teams-logo-images/${player.team.abbreviation}-2023.png`} alt="" />
                </div>
                <div className={style.player__info}>
                  <div className={style.player__text}><b>Name:</b> {`${player.first_name} ${player.last_name}`}</div>
                  <div className={style.player__text}><b>Height:</b>
                    {player.height_feet ?
                      ` ${player.height_feet}-${player.height_inches}` :
                      ' -'
                    }
                  </div>
                  <div className={style.player__text}><b>Weight:</b>
                    {player.weight_pounds ?
                      ` ${player.weight_pounds}lb` :
                      ' -'
                    }
                  </div>
                  <div className={style.player__text}><b>Position:</b>
                    {player.position ?
                      ` ${player.position}` :
                      ' -'
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
      <ReactPaginate
        containerClassName='pagination'
        onPageChange={handlePageClick}
        breakLabel="..."
        breakClassName={style.brea}
        // breakLinkClassName='break__link'
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="<Previous>"
        nextLabel=">"
        renderOnZeroPageCount={null}
      />
    </>
  )
}
