import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <nav className="navLeft">
          <NavLink className="navLink" to="/">
            Startsida
          </NavLink>
          <NavLink className="navLink" to="/posts">
            Blogg
          </NavLink>
        </nav>

        <Link className="brand" to="/">
          Amandas Journal
        </Link>

        <div className="navRight">
          {user ? (
            <>
              <NavLink className="navLink" to="/admin">
                Admin
              </NavLink>
              <button className="btn" onClick={logout} type="button">
                Logga ut
              </button>
            </>
          ) : (
            <NavLink className="btn btnPrimary" to="/login">
              Logga in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
