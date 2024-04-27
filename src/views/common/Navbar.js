import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faHome } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext"
// import img from '../../assets/images/drool.png';
const Navbar = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <nav className="navbar">
      <NavLink to="/">
        <h1 className="pointer">Rick and Morty</h1>
        <FontAwesomeIcon icon={faHome} className="pointer" />
        {/* <img src={img} alt="drool"/> */}
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/characters" activeclassname="active">Characters</NavLink>
        <NavLink to="/locations" activeclassname="active">Locations</NavLink>
        <NavLink to="/episodes" activeclassname="active">Episodes</NavLink>
      </div>
      <div className="navbar__theme">
        <FontAwesomeIcon icon={(theme === 'dark') ? faSun : faMoon} 
          className={`navbar__theme__icon navbar__theme__icon--${theme === 'light' ? 'dark' : 'light'}`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
        />
      </div>
    </nav>
  );
}

export default Navbar;