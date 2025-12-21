import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserDataRow from "./UserDataRow";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b bg-white">Email</th>
                  <th className="px-5 py-3 border-b bg-white">Role</th>
                  <th className="px-5 py-3 border-b bg-white">Status</th>
                  <th className="px-5 py-3 border-b bg-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserDataRow
                    key={user._id}
                    user={user}
                    refetchUsers={() =>
                      axiosSecure
                        .get("/users")
                        .then((res) => setUsers(res.data))
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
