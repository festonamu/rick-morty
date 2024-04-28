import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Filters from './common/Filters';
import Pagination from './common/Pagination';
import Loader from './common/Loader';
import { TypeContext } from "../hooks/Contexts";

const Cards = () => {
  const [type] = useContext(TypeContext);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [episode, setEpisode] = useState('');
  const [status, setStatus] = useState('');
  const extractId = (url) => {
    const match = url.match(/\/(\d+)$/);
    return match ? match[1] : Math.floor(Math.random() * 200) + 1;
  };

  const { data: cards, pagination, loading, empty } = useFetch(`https://rickandmortyapi.com/api/${type}?page=${page}&name=${name}&status=${status}&episode=${episode}`);

  const filterBy = (kind, param) => {
    const actions = {
      'name': () => { setEpisode(''); setStatus(''); setName(param); },
      'episode': () => { setName(''); setStatus(''); setEpisode(param); },
      'status': () => { setName(''); setEpisode(''); setStatus(param); },
      'clear': () => { setEpisode(''); setName(''); setStatus(''); }
    };

    actions[kind]?.();
  }

  return (
    <div>
      <h2 className="ps">{`${type}s`}</h2>
      <div className="flex-between ps">
        <Filters name={name} episode={episode} status={status} filterBy={filterBy} />
        <Pagination pagination={pagination} page={page} changePage={setPage} />
      </div>
      {(loading || empty) ? (<Loader message={empty} />) :
        <>
          <div className="cards">
            {cards.map((card) => (
              <div className="card" key={card.id}>
                {type === "character" && <div>
                  <div className="card__image">
                    <img src={`${card.image}`} alt={type} />
                    <div className="card__image__overlay"></div>
                    <div className="card__image__button">
                      <Link to={`/character/${card.id}`}>
                        See details
                      </Link>
                    </div>
                  </div>
                  <div className="card__info">
                    <div className="card__info__section">
                      <h2>{card.name}</h2>
                      {card.status && card.species && <span className="status">
                        <span className={`status__icon ${card.status === 'Alive' ? 'alive' : card.status === 'Dead' ? 'dead' : card.status === 'unknown' ? 'unknown' : ''}`}></span> {card.status} - {card.species}
                      </span>}
                    </div>
                    {card.location && card.location.url && <div className="card__info__section">
                      <span>Last known location:</span>
                      <Link to={`/location/${extractId(card.location.url)}`}>
                        {card.location.name}
                      </Link>
                    </div>}
                    {card.origin && card.origin.url && <div className="card__info__section">
                      <span>First seen in:</span>
                      <Link to={`/location/${extractId(card.origin.url)}`}>
                        {card.origin.name}
                      </Link>
                    </div>}
                  </div>
                </div>}
                {type === "location" && <div>
                  <div className="card__image">
                    {(card.residents && card.residents.length && card.residents.length > 0) ?
                      (<img src={`https://rickandmortyapi.com/api/character/avatar/${extractId(card.residents[0])}.jpeg`} alt={type} />)
                      :
                      (<img src={`https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg`} alt={type} />)
                    }
                    <div className="card__image__overlay"></div>
                    <div className="card__image__button">
                      <Link to={`/location/${card.id}`}>
                        See details
                      </Link>
                    </div>
                  </div>
                  <div className="card__info">
                    <div className="card__info__section">
                      <h2>{card.name}</h2>
                    </div>
                    <div className="card__info__section">
                      {card.dimension !== 'unknown' &&
                        <span>{card.dimension}</span>
                      }
                    </div>
                    {(card.residents && card.residents.length && card.residents.length > 0) ?
                      (<div className="card__info__section">
                        <span>Number of residents: {card.residents.length}</span>
                      </div>)
                      :
                      (<span></span>)
                    }
                  </div>
                </div>}
                {type === "episode" && <div>
                  <div className="card__image">
                    {(card.characters && card.characters.length && card.characters.length > 0) ?
                      (<img src={`https://rickandmortyapi.com/api/character/avatar/${extractId(card.characters[7])}.jpeg`} alt={type} />)
                      :
                      (<img src={`https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg`} alt={type} />)
                    }
                    <div className="card__image__overlay"></div>
                    <div className="card__image__button">
                      <Link to={`/episode/${card.id}`}>
                        See details
                      </Link>
                    </div>
                  </div>
                  <div className="card__info">
                    <div className="card__info__section">
                      <h2>{card.name}</h2>
                    </div>
                    <div className="card__info__section">
                      {card.episode !== 'unknown' &&
                        <span>{card.episode}</span>
                      }
                    </div>
                    {(card.characters && card.characters.length && card.characters.length > 0) ?
                      (<div className="card__info__section">
                        <span>Number of characters: {card.characters.length}</span>
                      </div>)
                      :
                      (<span></span>)
                    }
                  </div>
                </div>}
              </div>
            ))}
          </div>

          {/* <Pagination pagination={pagination} page={page} changePage={setPage} /> */}
        </>
      }
    </div>
  );
};

export default Cards;