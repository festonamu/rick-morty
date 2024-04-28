import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import Loader from './common/Loader';
import { useContext } from "react";
import { TypeContext } from "../hooks/Contexts";

const Details = () => {
  const [type, setType] = useContext(TypeContext);
  const { id } = useParams();
  const { data: card, loading, error } = useFetch(`https://rickandmortyapi.com/api/${type}/${id}`);
  const extractId = (url) => {
    const match = url.match(/\/(\d+)$/);
    return match ? match[1] : Math.floor(Math.random() * 200) + 1;
  };
  function ordinalSuffix(number) {
    if (number === 0) return '0';
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const v = number % 100;
      return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  return (
    <div>
      <h2 className="ps">{ordinalSuffix(id)} {type}</h2>
      {(loading || error) ? (<Loader message={error} />) :
        <div className="details__container">
          <Link to={`/${type}/${id - 1}`} className="details__container__arrow details__container__arrow--prev">
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Link>

          {card && (
            <>
              {type === 'character' && card.location && (
                <div className="details" key={card.id}>
                  <div className="details__section">
                    <div className="details__section__header">
                      <h1>{card.name}</h1> <br />
                      <h4>{card.name.split(' ')[0]} is a {card.gender} {card.species} and is {card.status}.</h4>
                    </div>
                    <div className="details__section__desc">
                      <p>{card.name.split(' ')[0]} is originally from &nbsp;
                        {
                          card.origin.name !== 'unknown' ? (<Link  onClick={() => { setType('location')}} to={`/location/${extractId(card.origin.url)}`}> {card.origin.name} </Link>)
                            : (<span> an unknown place </span>)
                        }
                        and it's last known location is &nbsp;
                        {
                          card.location.name !== 'unknown' ? (<Link  onClick={() => { setType('location')}} to={`/location/${extractId(card.location.url)}`}> {card.location.name}. </Link>)
                            : (<span> an unknown.</span>)
                        }
                      </p>
                      <br />
                      <p>{card.name.split(' ')[0]} can be seen in {card.episode.length} (~{(Math.floor((card.episode.length / 51) * 100))}% of) episodes.</p>
                    </div>
                  </div>
                  <div className="details__back" style={{ backgroundImage: `url("${card.image}")`, backgroundSize: "cover" }}></div>
                </div>
              )}
              {type === 'location' && card.residents && (
                <div className="details" key={card.id}>
                  <div className="details__section">
                    <div className="details__section__header">
                      <h1>{card.name}</h1> <br />
                      <h4>{card.name} is a {card.type} type of {card.dimension}.</h4>
                    </div>
                    <div className="details__section__desc">
                      <p>{card.name} holds {card.residents.length} residents (click to see them).</p>
                      <p className="characters">
                        {Array.from({ length: card.residents.length }, (_, index) => index + 1).map(i => (
                          <Link key={i}  onClick={() => { setType('character')}} to={`/character/${extractId(card.residents[i - 1])}`}> {extractId(card.residents[i - 1])} </Link>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="details__back" style={{ backgroundImage: `url("https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg")`, backgroundSize: "cover" }}></div>
                </div>
              )}
              {type === 'episode' && card.characters && (
                <div className="details" key={card.id}>
                  <div className="details__section">
                    <div className="details__section__header">
                      <h1>{card.name}</h1> <br />
                      <h4>{card.name} is episode {card.episode.substring(4)} from season {card.episode.substring(1, 3)},
                        <br /> and it aired on {card.air_date}.
                      </h4>
                    </div>
                    <div className="details__section__desc">
                      <p>{card.characters.length} characters are shown in this episode (click to see them)</p>
                      <p className="characters">
                        {Array.from({ length: card.characters.length }, (_, index) => index + 1).map(i => (
                          <Link key={i} onClick={() => { setType('character')}}
                            to={`/character/${extractId(card.characters[i - 1])}`}> {extractId(card.characters[i - 1])} </Link>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="details__back" style={{ backgroundImage: `url("https://rickandmortyapi.com/api/character/avatar/${extractId(card.characters[7])}.jpeg")`, backgroundSize: "cover" }}></div>
                </div>
              )}
            </>
          )}

          <Link to={`/${type}/${parseInt(id) + 1}`} className="details__container__arrow details__container__arrow--next">
            <FontAwesomeIcon icon={faAnglesRight} />
          </Link>
        </div>
      }
    </div>
  );
};

export default Details;