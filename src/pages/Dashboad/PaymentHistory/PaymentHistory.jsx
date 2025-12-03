import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
              `/payments?email=${user.email}`
            );
            return res.data
        }
    })
    
    return (
      <div>
        <h2 className="text-5xl">Payment History: {payments.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Tracking Id</th>
                <th>Amount</th>
                <th>Paid Time</th>
                <th>Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, i) => (
                <tr key={payment._id}>
                  <th>{i + 1}</th>
                  <td>{payment.trackingId ?payment.trackingId : 'No Tracking Id Found, pls contact admin' }</td>
                  <td>${payment.amount}</td>
                  <td>{payment.paidAt}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;