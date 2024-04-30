import { FC } from "react";
import { Link } from 'react-router-dom';
import extractId from "../../utils/extractId";

interface CardProps {
  card: {
    id: number;
    image: string;
    name: string;
    gender: string;

    status: string;
    species: string;
    location: {
      url: string;
      name: string;
    };
    origin: {
      url: string;
      name: string;
    };
    episode: string[]
  };
}

const Character: FC<CardProps> = ({card}) => {

  return (
    <div className="details" key={card.id}>
      <div className="details__section">
        <div className="details__section__header">
          <h1>{card.name}</h1> <br />
          <h4>{card.name.split(' ')[0]} is a {card.gender} {card.species} and is {card.status}.</h4>
        </div>
        <div className="details__section__desc">
          <p>{card.name.split(' ')[0]} is originally from &nbsp;
            {
              card.origin.name !== 'unknown' ? (<Link to={`/location/${extractId(card.origin.url)}`}> {card.origin.name} </Link>)
                : (<span> an unknown place </span>)
            }
            and it's last known location is &nbsp;
            {
              card.location.name !== 'unknown' ? (<Link to={`/location/${extractId(card.location.url)}`}> {card.location.name}. </Link>)
                : (<span> an unknown.</span>)
            }
          </p>
          <br />
          <p>{card.name.split(' ')[0]} can be seen in {card.episode.length} (~{(Math.floor((card.episode.length / 51) * 100))}% of) episodes.</p>
        </div>
      </div>
      <div className="details__back" style={{ backgroundImage: `url("${card.image}")`, backgroundSize: "cover" }}></div>
    </div>
  );
}

export default Character;