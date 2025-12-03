import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Rider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-4xl font-bold">Be A Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4"
      >
       
        {/* two column */}
        <div className="grid grid-cols-1 my-12 md:grid-cols-2 gap-5">
          {/* sender info */}
          <div>
            <h4 className="text-2xl font-semibold">Rider Details</h4>
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

export default Rider;
