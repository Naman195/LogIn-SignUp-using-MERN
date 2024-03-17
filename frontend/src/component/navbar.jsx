import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">ThapaTechnical</NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/profile"> UserProfile </NavLink>
            </li>
           
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register"> Register </NavLink>
                </li>
                <li>
                  <NavLink to="/login"> Login </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
    </>
  );
};