import { FC } from "react";
import { Link } from 'react-router-dom';
import extractId from "../../utils/extractId";

interface CardProps {
  card: {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[]
  };
}

const Episode: FC<CardProps> = ({ card }) => {
  return (
    <div className="details">
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
              <Link key={i} to={`/character/${extractId(card.characters[i - 1])}`}> {extractId(card.characters[i - 1])} </Link>
            ))}
          </p>
        </div>
      </div>
      <div className="details__back" style={{ backgroundImage: `url("https://rickandmortyapi.com/api/character/avatar/${extractId(card.characters[7])}.jpeg")`, backgroundSize: "cover" }}></div>
    </div>
  );
}

export default Episode;