import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] =useState(null)
    const axiosSecure = useAxiosSecure()
    const riderModalRef = useRef()
    const { data: parcels = [],refetch: parcelRefetch} = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async() => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data
        }
    })
    const {data: riders =[],refetch: riderRefetch } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict,'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`)
            return res.data
        }
    })
    const assignRiderModal = parcel => {
        riderRefetch()
        setSelectedParcel(parcel);
        riderModalRef.current.showModal()

    }
    
    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail : rider.riderEmail,
            riderName: rider.riderName,
            parcelId: selectedParcel._id
        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`,riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                toast.success('Rider Assigned')
                    riderRefetch()
                    parcelRefetch()
            }
        })
    }
    return (
      <div>
        <h2 className="text-5xl">Assign Riders: {parcels.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Tracking ID</th>
                <th>Pickup District</th>
                <th>Delivery District</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {parcels.map((parcel, i) => (
                <tr key={parcel._id}>
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>{parcel.createdAt}</td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.receiverDistrict}</td>
                  <td>
                    <button
                      onClick={() => assignRiderModal(parcel)}
                      className="btn btn-primary text-black"
                    >
                      Find Riders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog
          ref={riderModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Riders: {riders.length}!</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>email</th>
                    <th> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {riders.map((rider,i) => (
                    <tr key={rider._id}>
                          <th>{i + 1}</th>
                          <td>{rider.riderName}</td>
                          <td>{rider.riderEmail}</td>
                          <td>
                              <button onClick={()=> handleAssignRider(rider)} className="btn btn-primary text-black">Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
};

export default AssignRiders;