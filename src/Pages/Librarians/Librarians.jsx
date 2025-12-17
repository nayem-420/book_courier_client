import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Librarians = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const bookData = {
      ...data,
      librarianEmail: user?.email,
      createdAt: new Date(),
    };

    console.log(bookData);
    // TODO: POST to backend
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Book Name */}
        <div>
          <label className="label">Book Name</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter book name"
          />
        </div>

        {/* Author */}
        <div>
          <label className="label">Author Name</label>
          <input
            type="text"
            {...register("author", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter author name"
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Book Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            placeholder="https://image-url.com"
          />
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Price (৳)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
              placeholder="450"
            />
          </div>

          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full"
              placeholder="10"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select
            {...register("status", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="label">Short Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            placeholder="Write short description..."
          />
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full">Add Book</button>
      </form>
    </div>
  );
};

export default Librarians;
