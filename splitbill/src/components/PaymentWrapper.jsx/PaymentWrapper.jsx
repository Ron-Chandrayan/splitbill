import React from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import Payment from '../Payment/Payment';

function PaymentWrapper() {
  const { signup,login,setpaymentmode,paymentmode } = useOutletContext();

  if ((signup!=login) &&(!paymentmode)) {
    return <Navigate to="/" replace />;
  }

  return <Payment/>;
}

export default PaymentWrapper;