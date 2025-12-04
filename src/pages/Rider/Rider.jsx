import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

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
  const districtsByRegion = (region) => {
      const regionDistricts = serviceCenters.filter((c) => c.region === region);
      const districts = regionDistricts.map((d) => d.district);
      return districts;
    };
    const riderRegion = useWatch({ control, name: "riderRegion" });

    const handleRiderApplication = (data) => {
        axiosSecure.post('/riders', data)
            .then(res => {
                console.log(res.data);
                
                if (res.data.insertedId) {
                toast.success('Your Application has been submitted')
            }
        })
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
          {/* rider info */}
          <div>
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            {/* rider name */}
            <fieldset className="fieldset">
              <label className="label">Rider Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register("riderName")}
                className="input w-full"
                placeholder="Rider Name"
              />
            </fieldset>
            {/* rider email */}
            <fieldset className="fieldset">
              <label className="label">Rider Email</label>
              <input
                type="text"
                {...register("riderEmail")}
                className="input w-full"
                placeholder="Rider Email"
                defaultValue={user?.email}
              />
            </fieldset>
            {/* rider region */}
            <fieldset className="fieldset">
              <label className="label">Region</label>
              <select
                {...register("riderRegion")}
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
            {/* rider district */}
            <fieldset className="fieldset">
              <label className="label"> District</label>
              <select
                {...register("district")}
                defaultValue="Pick a District"
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(riderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Rider Address</label>
              <input
                type="text"
                {...register("riderAddress")}
                className="input w-full"
                placeholder="Rider Address"
              />
            </fieldset>
          </div>
          {/* receiver info */}
          <div>
            <h4 className="text-2xl font-semibold">More Details</h4>
            <fieldset className="fieldset">
              <label className="label">Driving license</label>
              <input
                type="text"
                {...register("drivingLicense")}
                className="input w-full"
                placeholder="driving license"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="nid"
              />
            </fieldset>
           {/* bike info */}
            <fieldset className="fieldset">
              <label className="label">Bike Info</label>
              <input
                type="text"
                {...register("bikeInfo")}
                className="input w-full"
                placeholder="Bike Info"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-full text-black"
          value="Apply As a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
