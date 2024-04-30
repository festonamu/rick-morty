import { FC } from 'react';
import { Link } from 'react-router-dom';
import extractId from '../utils/extractId';

interface CardProps {
  card: {
    id: number;
    image?: string;
    name: string;

    status?: string;
    species?: string;
    location?: {
      url: string;
      name: string;
    };
    origin?: {
      url: string;
      name: string;
    };

    dimension?: string;
    residents?: string[];

    episode?: string;
    characters?: string[];
  };
  type: string | undefined;
}

const Overview:FC<CardProps> = ({ card, type }) => {

  const avatar = () => {
    if (card.image) {
      return card.id;
    } else if (card.residents && card.residents.length) {
      return extractId(card.residents[0]);
    } else if (card.characters && card.characters.length > 6) {
      return extractId(card.characters[7]);
    } else {
      return extractId('');;
    }
  }

  return (
    <>
      <div className="card__image">
        <img src={`https://rickandmortyapi.com/api/character/avatar/${avatar()}.jpeg`} alt={type} />
        <div className="card__image__overlay"></div>
        <div className="card__image__button">
          <Link to={`/${type}/${card.id}`}> See details </Link>
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
        {card.dimension && <div className="card__info__section">
          {card.dimension !== 'unknown' && <span>{card.dimension}</span>}
        </div>
        }
        {card.residents && <div className="card__info__section">
          <span>Number of residents: {card.residents.length}</span>
        </div>
        }
        {card.episode && type === 'episode' && <div className="card__info__section">
          <span>{card.episode}</span>
        </div>
        }
        {card.characters && <div className="card__info__section">
          <span>Number of characters: {card.characters.length}</span>
        </div>
        }
      </div>
    </>
  );
};

export default Overview;