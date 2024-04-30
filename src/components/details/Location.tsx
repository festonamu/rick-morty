import { FC } from "react";
import { Link } from 'react-router-dom';
import extractId from "../../utils/extractId";

interface CardProps {
  card: {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[]
  };
}

const Location: FC<CardProps> = ({ card }) => {

  return (
    <div className="details">
      <div className="details__section">
        <div className="details__section__header">
          <h1>{card.name}</h1> <br />
          <h4>{card.name} is a {card.type} type of {card.dimension}.</h4>
        </div>
        <div className="details__section__desc">
          <p>{card.name} holds {card.residents.length} residents (click to see them).</p>
          <p className="characters">
            {Array.from({ length: card.residents.length }, (_, index) => index + 1).map(i => (
              <Link key={i} to={`/character/${extractId(card.residents[i - 1])}`}> {extractId(card.residents[i - 1])} </Link>
            ))}
          </p>
        </div>
      </div>
      <div className="details__back" style={{ backgroundImage: `url("https://rickandmortyapi.com/api/character/avatar/${extractId('')}.jpeg")`, backgroundSize: "cover" }}></div>
    </div>
  );
}

export default Location;