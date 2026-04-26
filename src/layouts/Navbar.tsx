import { Link } from 'react-router';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <nav>
      <Link to="/">Home</Link>

      {token ? (<><Link to="/user">User</Link>
        <Link to="/editor">Event Editor</Link></>

      ) : (<>
        <Link to="/sign-in">Login</Link>
        <Link to="/sign-out"></Link>
      </>)}
    </nav>
  );
};

export default Navbar;
