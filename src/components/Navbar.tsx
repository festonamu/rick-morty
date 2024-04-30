import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faHome } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from "../providers/Contexts";
import './../assets/style/components/_navbar.scss';

const Navbar: FC = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <NavLink to="/">
        <h1 className="pointer">Rick and Morty</h1>
        <FontAwesomeIcon icon={faHome} className="pointer" />
      </NavLink>
      <div className="navbar__links">
        {['character', 'location', 'episode'].map((type, index) => (
          <NavLink key={index} to={`/${type}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </NavLink>
        ))}
      </div>
      <div className="navbar__theme">
        <FontAwesomeIcon
          icon={(theme === 'dark') ? faSun : faMoon}
          className={`navbar__theme__icon navbar__theme__icon--${theme === 'light' ? 'dark' : 'light'}`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
      </div>
    </nav>
  );
};

export default Navbar;