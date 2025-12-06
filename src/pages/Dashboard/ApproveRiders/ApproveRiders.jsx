import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrashCan, FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { toast } from 'react-toastify';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const {data: riders = [],refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async ()=> {
            const res = await axiosSecure.get('/riders')
            return res.data
            
        }
    })

    const updateRiderStatus = (rider, status) => {
      const updateInfo = { status: status ,email: rider.riderEmail};
      axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
        console.log(res.data);

        if (res.data.modifiedCount) {
          refetch();
          toast.success(`RIder Has Been ${status}`);
        }
      });
    };

    const handleApproval = rider => {
        // console.log(id);
        
        updateRiderStatus(rider,'approved')
            
        }
    const handleReject = rider => {
            updateRiderStatus(rider,'reject')
        }
    return (
      <div>
        <h1 className="text-5xl">Pending Riders: {riders.length}</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Application Status</th>
                <th>Work Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {riders.map((rider, i) => (
                <tr key={rider._id}>
                  <th>{i + 1}</th>
                  <td>{rider.riderName}</td>
                  <td>{rider.riderEmail}</td>
                  <td>{rider.district}</td>
                  <td>
                    <p
                      className={`${
                        rider.status === "approved"
                          ? "text-green-800"
                          : "text-red-500"
                      }`}
                    >
                      {rider.status}
                    </p>
                  </td>
                  <td>{rider.workStatus}</td>

                  <td>
                    <button className="btn">
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleApproval(rider)}
                      className="btn"
                    >
                      <FaUserCheck />
                    </button>
                    <button onClick={() => handleReject(rider)} className="btn">
                      <IoPersonRemoveSharp />
                    </button>
                    <button className="btn">
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ApproveRiders;