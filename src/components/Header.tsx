import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const { user, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/">Startsida</NavLink></li>
                    <li><NavLink to="/posts">Blogg</NavLink></li>
                    
                    {user && (
                        <li><NavLink to="/admin">Admin</NavLink></li>
                    )}
                    <li>
                        {
                            !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                        }
                        </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header