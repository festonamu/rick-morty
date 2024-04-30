import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import './../assets/style/_details.scss';
import Character from '../components/details/Character';
import Location from '../components/details/Location';
import Episode from '../components/details/Episode';

const Details: FC = () => {
  const { type } = useParams<string>();
  const { id } = useParams<string>();
  const { data: card, loading, error } = useFetch(`https://rickandmortyapi.com/api/${type}/${id}`);

  function ordinalSuffix(number: string) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = parseInt(number) % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  return (
    <div>
      {id && <>
        <h2 className="ps">{ordinalSuffix(id)} {type}</h2>
        {(loading || error) ? (<Loader message={error} />) :
          <div className="details__container">

            {(parseInt(id) < 2) ? (<span className="details__container__last"></span>) :
              (<Link to={`/${type}/${parseInt(id) - 1}`} className="details__container__arrow details__container__arrow--prev">
                <FontAwesomeIcon icon={faAnglesLeft} />
              </Link>)
            }

            {card && (
              <>
                {type === 'character' && card.location && (
                  <Character card={card} />
                )}
                {type === 'location' && card.residents && (
                  <Location card={card} />
                )}
                {type === 'episode' && card.characters && (
                  <Episode card={card} />
                )}
              </>
            )}

            <Link to={`/${type}/${parseInt(id) + 1}`} className="details__container__arrow details__container__arrow--next">
              <FontAwesomeIcon icon={faAnglesRight} />
            </Link>

          </div>
        }
      </>}
    </div>
  );
};

export default Details;
