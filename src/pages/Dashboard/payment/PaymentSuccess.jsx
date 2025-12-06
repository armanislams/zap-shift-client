import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const[ paymentInfo, setPaymentInfo] = useState({})
  const axiosSecure =useAxiosSecure()
  const sessionId = searchParams.get('session_id')
  console.log(paymentInfo);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId : res.data.trackingId
          })
        
      })
    }
  },[sessionId, axiosSecure])
  
    return (
      <div>
        <h2 className="text-4xl">Payment Successful</h2>
        <p>Your Transaction Id is: {paymentInfo?.transactionId}</p>
        <p>your tracking no: {paymentInfo?.trackingId}</p>
        <Link to={"/dashboard/my-parcels"}>
          <button className="btn btn-primary text-black">
            Go to your parcels
          </button>
        </Link>
      </div>
    );
};

export default PaymentSuccess;