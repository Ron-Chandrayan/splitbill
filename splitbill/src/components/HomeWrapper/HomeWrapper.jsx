import React from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import Home from '../Home/Home';

function HomeWrapper() {
  const { signup,login } = useOutletContext();

  if (signup!=login) {
    return <Navigate to="/" replace />;
  }

  return <Home/>;
}

export default HomeWrapper;