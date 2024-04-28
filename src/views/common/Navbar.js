import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faHome } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from "react";
import { ThemeContext, TypeContext } from "../../hooks/Contexts";
// import img from '../../assets/images/drool.png';
const Navbar = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [type, setType] = useContext(TypeContext);
  const location = useLocation();

  useEffect(() => {
    setType(
      location.pathname.includes('/character') ? 'character' : 
      location.pathname.includes('/location') ? 'location' : 
      location.pathname.includes('/episode') ? 'episode' : ''
    );
  }, []);
  
  return (
    <nav className="navbar">
      <NavLink to="/">
        <h1 className="pointer">Rick and Morty {type}</h1>
        <FontAwesomeIcon icon={faHome} className="pointer" />
        {/* <img src={img} alt="drool"/> */}
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/character" activeclassname="active" onClick={() => { setType('character') }}>Characters</NavLink>
        <NavLink to="/location" activeclassname="active" onClick={() => { setType('location') }}>Locations</NavLink>
        <NavLink to="/episode" activeclassname="active" onClick={() => { setType('episode') }}>Episodes</NavLink>
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