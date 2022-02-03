import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
