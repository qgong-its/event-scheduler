import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';

import { getToken, removeToken } from '@/utils/tokenStorage';

const Navbar = () => {
  const [token, setToken] = useState(getToken());

  const navigate = useNavigate();

  const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = () => {
    removeToken();
    setToken(null);
    navigate('/');
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {token && (
          <NavLink to="/editor" className="btn btn-ghost">
            Event Editor
          </NavLink>
        )}
      </div>
      <div className="navbar-end gap-2">
        {token ? (
          <>
            <NavLink to="/user" className="btn btn-ghost">
              User
            </NavLink>
            <button type="button" onClick={handleSignOut} className="btn">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/sign-in" className="btn btn-ghost">
              Login
            </NavLink>
            <NavLink to="/sign-up" className="btn btn-primary">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
