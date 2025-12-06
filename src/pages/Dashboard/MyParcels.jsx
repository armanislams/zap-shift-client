import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {FiEdit} from 'react-icons/fi'
import {FaMagnifyingGlass, FaTrashCan} from 'react-icons/fa6'
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  
   const handlePayment = async (parcel) => {
     const paymentInfo = {
       cost: parcel.cost,
       parcelId: parcel._id,
       senderEmail: parcel.senderEmail,
       parcelName: parcel.parcelName,
     };
     const res = await axiosSecure.post(
       "/create-checkout-session",
       paymentInfo
     );
     window.location.assign(res.data.url);
   };
    const handleDelete = id => {
        console.log(id);
        Swal.fire({
              title: "Delete Parcel??",
              text: `Are You sure want to deete!`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "I Agree",
            }).then((result) => {
              if (result.isConfirmed) {        
                // server delete
                axiosSecure.delete(`/parcels/${id}`)
                  .then(res => {
                      console.log(res.data);
                      if (res.data.deletedCount) {
                        //refetch data in ui
                          refetch();
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your parcel has been Deleted.",
                          icon: "success",
                        });
                      }
                  })
              }
            });
        
    }
  return (
    <div className="px-5">
      <h2>my parcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Tracking Id</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-700 font-bold text-xl">Paid</span>
                  ) : (
                    // <Link to={`/dashboard/payment/${parcel._id}` }>
                    // </Link>
                    <button
                      onClick={()=>handlePayment(parcel)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit></FiEdit>
                  </button>
                  <button className="mx-2 btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
