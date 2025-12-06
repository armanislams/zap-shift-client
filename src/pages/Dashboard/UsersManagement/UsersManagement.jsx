import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const [searchText,setSearchText] = useState();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users",searchText],
    queryFn: async () => {
      const text = searchText?.trim() || "";
      const res = await axiosSecure.get(`/users?searchText=${text}`);
      return res.data;
    },
  });
  

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Are you sure?",
          text: `!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "I Agree",
        }).then((result) => {
          if (result.isConfirmed) {
            toast.success(`${user.displayName} Converted To Admin`);
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`${user.displayName} Removed From Admin`);
      }
    });
  };
  return (
    <div>
      <h1 className="text-4xl">Manage Users: {users.length}</h1>
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search User"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {/* <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn"
                    >
                      <FiShieldOff className="bg-red-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                        className="btn"
                        disabled={user.role === 'admin'}
                    >
                      <FaUserShield className="bg-green-500" />
                    </button>
                  )}
                </td> */}
                <td>
                  {user.role === "super-admin" ? (
                    <button
                      className="btn opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <FiShieldOff />
                    </button>
                  ) : user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn"
                    >
                      <FiShieldOff className="bg-red-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn"
                    >
                      <FaUserShield className="bg-green-500" />
                    </button>
                  )}
                </td>

                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
