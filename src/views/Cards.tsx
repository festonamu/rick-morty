import { FC, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Filters from './common/Filters';
import Pagination from './common/Pagination';
import Loader from './common/Loader';

const Cards: FC = () => {
  const { type } = useParams<string>();
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [episode, setEpisode] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  
  const { data: cards, pagination, loading, error } = useFetch(`https://rickandmortyapi.com/api/${type}?page=${page}&name=${name}&status=${status}&episode=${episode}`);
  
  const extractId = (url: string): number => {
    const match = url.match(/\/(\d+)$/);
    return match ? parseInt(match[1]) : Math.floor(Math.random() * 200) + 1;
  };

  const filterBy = (kind: string, param: string) => {
    const actions: { [key: string]: () => void } = {
      'name': () => { setEpisode(''); setStatus(''); setName(param); },
      'episode': () => { setName(''); setStatus(''); setEpisode(param); },
      'status': () => { setName(''); setEpisode(''); setStatus(param); },
      'clear': () => { setEpisode(''); setName(''); setStatus(''); }
    };

    actions[kind]?.();
  }

  useEffect(() => {
    setPage(1);
  }, [type])

  return (
    <div>
      <h2 className="ps">{`${type}s`}</h2>
      <div className={`cards__filters ps ${loading ? 'disabled' : ''}`}>
        <Filters type={type} name={name} episode={episode} status={status} filterBy={filterBy} />
        {pagination && pagination.pages > 1 && !error && <Pagination pagination={pagination} page={page} changePage={setPage} />}

      </div>
      {(loading || error) ? (<Loader message={error} />) :
        <>
          <div className="cards">
            {cards.map((card: any) => (
              <div className="card" key={card.id}>
                {type === "character" && <div>
                  <div className="card__image">
                    <img src={`${card.image}`} alt={type} />
                    <div className="card__image__overlay"></div>
                    <div className="card__image__button">
                      <Link to={`/character/${card.id}`}> See details </Link>
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
                      <Link to={`/location/${extractId(card.location.url)}`}> {card.location.name} </Link>
                    </div>}
                    {card.origin && card.origin.url && <div className="card__info__section">
                      <span>First seen in:</span>
                      <Link to={`/location/${extractId(card.origin.url)}`}> {card.origin.name} </Link>
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
                      <Link to={`/location/${card.id}`}> See details </Link>
                    </div>
                  </div>
                  <div className="card__info">
                    <div className="card__info__section">
                      <h2>{card.name}</h2>
                    </div>
                    <div className="card__info__section">
                      {card.dimension !== 'unknown' && <span>{card.dimension}</span>}
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
                      <Link to={`/episode/${card.id}`}> See details </Link>
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
          {pagination && pagination.pages > 1 && <Pagination pagination={pagination} page={page} changePage={setPage} />}
        </>
      }
    </div>
  );
};

export default Cards;