import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from './common/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const Details = ({type}) => {
  
  const { id } = useParams();
  const { data: card, loading } = useFetch(`https://rickandmortyapi.com/api/${type}/${id}`);
  const extractId = (url) => {
    const match = url.match(/\/(\d+)$/);
    return match ? match[1] : Math.floor(Math.random() * 200) + 1;
  };
  
  return (
    <div>
      {card && <h2>{type}</h2>}
      {loading && <Loader />}
      <div className="details__container">
        <Link to={`/${type}s/${id-1}`}>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Link>
        {!loading && type === 'character' && card && card.location && 
          <div className="details" key={card.id}>
            <div className="details__section">
              <div className="details__section__header">
                <h1>{card.name}</h1> <br />
                <h4>{card.name.split(' ')[0]} is a {card.gender} {card.species} and is {card.status}.</h4>
              </div>
              <div className="details__section__desc">
                <p>{card.name.split(' ')[0]} is originally from 
                  {card.origin.name !== 'unknown' ? 
                    ( <Link to={`/locations/${extractId(card.origin.url)}`}> {card.origin.name} </Link>) 
                    : ( <span> an unknown place </span> )
                  }
                  and it's last known location is 
                  {card.location.name !== 'unknown' ? 
                    ( <Link to={`/locations/${extractId(card.location.url)}`}> {card.location.name}. </Link>) 
                    : ( <span> an unknown.</span> )
                  }
                </p>
                <br />
                <p>{card.name.split(' ')[0]} can be seen in {card.episode.length} (~{(Math.floor((card.episode.length / 51) * 100))}% of) episodes.</p>
              </div>
            </div>
            <div className="details__back" style={{ background: `url("${card.image}")`, backgroundSize: "cover" }}></div>
          </div>
        }
        {!loading  && type === 'location' && card && card.residents &&
          <div className="details" key={card.id}>
            <div className="details__section">
              <div className="details__section__header">
                <h1>{card.name}</h1> <br />
                <h4>{card.name} is a {card.type} type of {card.dimension}.</h4>
              </div>
              <div className="details__section__desc">
                <p>{card.name} holds {card.residents.length} residents (click to see).</p>
                <p className="characters" style={{ width: '220px' }}>
                  {Array.from({ length: card.residents.length }, (_, index) => index + 1).map(i => (
                    <Link key={i} to={`/characters/${extractId(card.residents[i-1])}`}> {extractId(card.residents[i-1])} </Link>
                  ))}
                </p>
              </div>
            </div>
            <div className="details__back" style={{ background: `url("https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg")`, backgroundSize: "cover" }}></div>
          </div>
        }
        {!loading  && type === 'episode' && card && card.characters &&
          <div className="details" key={card.id}>
            <div className="details__section">
              <div className="details__section__header">
                <h1>{card.name}</h1> <br />
                <h4>{card.name} is episode {card.episode.substring(1, 3)} from season {card.episode.substring(4)},
                  <br/> and it aired on {card.air_date}.
                </h4>
              </div>
              <div className="details__section__desc">
                <p>{card.characters.length} characters are shown in this episode (click to see)</p>
                <p className="characters" style={{ width: '280px' }}>
                  {Array.from({ length: card.characters.length }, (_, index) => index + 1).map(i => (
                    <Link key={i} to={`/characters/${extractId(card.characters[i-1])}`}> {extractId(card.characters[i-1])} </Link>
                  ))}
                </p>
              </div>
            </div>
            <div className="details__back" style={{ background: `url("https://rickandmortyapi.com/api/character/avatar/${extractId(card.characters[7])}.jpeg")`, backgroundSize: "cover" }}></div>
          </div>
        }
        <Link to={`/${type}s/${parseInt(id)+1}`}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </Link>
      </div>
    </div>
  );
};

export default Details;