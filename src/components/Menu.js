import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu bg-secondary py-2">
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-xxl justify-content-center">
          <Link className="pokedex-logo" to="/">
            Pokedex
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Menu;
