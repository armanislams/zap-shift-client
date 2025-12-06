import React from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import useRole from "../../hooks/useRole";

const MyProfile=()=> {
    const { user, loading } = useAuth();
    const {role} = useRole()
    console.log(role);
    
  if(loading) return <Loader/>

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 text-center">
      <img
        src={user?.photoURL}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500"
      />

      <h2 className="text-2xl font-bold mt-4">Name: {user?.displayName}</h2>
      <p className="text-gray-600 text-sm">Email: {user&& user.email}</p>

      <p className="mt-3 text-gray-700">Role: {role}</p>
    </div>
  );
}
export default MyProfile