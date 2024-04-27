import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/episodes">Episodes</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;