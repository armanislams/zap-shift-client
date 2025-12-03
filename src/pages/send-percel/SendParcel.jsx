import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
  } = useForm();
  const navigate = useNavigate()
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({control, name: "senderRegion"});
  const receiverRegion = useWatch({control, name: "receiverRegion"});

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };


  const handleSendParcel = (data) => {
      console.log(data);
      const isDocument = data.parcelType === 'document'
      const isSameDistrict = data.senderDistrict === data.receiverDistrict;
      let cost = 0;
      const parcelWeight = parseFloat(data.parcelWeight);
      if (isDocument) {
          cost = isSameDistrict ? 60 : 80
      }
      else {
          if (parcelWeight < 3) {
              cost = isSameDistrict ? 110 : 150
          } else {
            const minimumCharge = isSameDistrict ? 110 : 150
            const extraWeight = parcelWeight - 3
            const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
            cost = minimumCharge + extraCharge
          }
    }
    console.log(cost);
    data.cost = cost
    Swal.fire({
      title: "Agree with the cost??",
      text: `you will be charge ${cost} tk!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I Agree",
    }).then((result) => {
      if (result.isConfirmed) {        
        // server post
        axiosSecure.post('/parcels', data)
          .then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              navigate('/dashboard/my-parcels')
             Swal.fire({
               position: "top-end",
               icon: "success",
               title: "Parcels Has been created, proceed to payment",
               showConfirmButton: false,
               timer: 1500,
              });
            }
          })
      }
    });
    
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4">
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              className="radio"
              value="document"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              className="radio"
              value="non-document"
            />
            Non - Document
          </label>
        </div>
        {/* parcel info: name - weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="parcel Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-5">
          {/* sender info */}
          <div>
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <fieldset className="fieldset">
              <label className="label">Sender Name</label>
              <input
                type="text"
              defaultValue={user?.displayName}
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
              />
            </fieldset>
            {/* sender email */}
            <fieldset className="fieldset">
              <label className="label">Sender Email</label>
              <input
                type="text"
                {...register("senderEmail")}
                className="input w-full"
                placeholder="Sender Email"
                defaultValue={user?.email}
              />
            </fieldset>
            {/* sender region */}
            <fieldset className="fieldset">
              <label className="label">Sender Region</label>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a Region"
                className="select w-full"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* sender district */}
            <fieldset className="fieldset">
              <label className="label">Sender District</label>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
          </div>
          {/* receiver info */}
          <div>
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            <fieldset className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Receiver Email</label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />
            </fieldset>
            {/* receiver region */}
            <fieldset className="fieldset">
              <label className="label">Receiver Region</label>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a Region"
                className="select w-full"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* receiver district */}
            <fieldset className="fieldset">
              <label className="label">Receiver District</label>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-full text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
