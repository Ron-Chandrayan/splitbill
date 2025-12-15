import React from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import Group from '../Group/Group';

function GroupWrapper() {
  const { signup,login,paymentmode,setpaymentmode } = useOutletContext();

  if (signup!=login) {
    return <Navigate to="/" replace />;
  }

  return <Group/>;
}

export default GroupWrapper;