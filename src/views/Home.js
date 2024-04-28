import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container__header">
          <h1>Rick and Morty Explorer</h1>
        </div>
        <p className="home__container__note">
          Explore the characters, locations and episodes of Rick and Morty animated sitcom.
        </p>
        <div className="home__container__slider">
          <input type="radio" id="button-1" name="radio-set" className="sp-selector-1" defaultChecked />
          <label htmlFor="button-1" className="button-label-1"></label>

          <input type="radio" id="button-2" name="radio-set" className="sp-selector-2" />
          <label htmlFor="button-2" className="button-label-2"></label>

          <input type="radio" id="button-3" name="radio-set" className="sp-selector-3" />
          <label htmlFor="button-3" className="button-label-3"></label>

          <label htmlFor="button-1" className="sp-arrow sp-a1"></label>
          <label htmlFor="button-2" className="sp-arrow sp-a2"></label>
          <label htmlFor="button-3" className="sp-arrow sp-a3"></label>

          <div className="home__container__slider__content">
            <div className="sp-parallax-bg"></div>
            <ul className="sp-slider">
              <li>
                <img src={`https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg`} alt="image01" />
                <Link to="/character">Check Characters</Link>
              </li>
              <li>
                <img src={`https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg`} alt="image02" />
                <Link to="/location">Check Locations</Link>
              </li>
              <li>
                <img src={`https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 200) + 1}.jpeg`} alt="image03" />
                <Link to="/episode">Check Episodes</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;