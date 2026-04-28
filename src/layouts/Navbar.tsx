import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';

import { getToken, removeToken } from '@/utils/tokenStorage';

const Navbar = () => {
  const [token, setToken] = useState(getToken());

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(getToken());
    };

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

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
      <div className="navbar-end gap-2">
        {token ? (
          <>
            <NavLink to="/editor" className="btn btn-ghost">
              Event Editor
            </NavLink>
            <NavLink to="/user" className="btn btn-ghost">
              User
            </NavLink>
            <button type="button" className="btn" onClick={handleSignOut}>
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
