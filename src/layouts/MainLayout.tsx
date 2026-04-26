import { Outlet } from 'react-router';

import Navbar from '@/layouts/MainLayout';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
