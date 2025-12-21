import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const [role, isLoading] = useRole();
  console.log(role,isLoading);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      image: user?.photoURL || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        image: data.image,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      // optional: local update
      setUser({
        ...user,
        displayName: data.name,
        photoURL: data.image,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          {isLoading ? (
            <p>Loading role...</p>
          ) : (
            <p className="btn btn-outline rounded-3xl">{role}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Profile Image URL</label>
          <input
            {...register("image")}
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
