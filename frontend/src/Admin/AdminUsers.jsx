import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.token) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
              User Directory
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              Manage and view all registered users.
            </p>
          </div>

          <div className="bg-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-zinc-400 text-sm">Total Users: </span>

            <span className="text-orange-500 font-bold">{users.length}</span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">No users found.</div>
        ) : (
          /* Users Table */
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full min-w-[750px] text-left border-collapse">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-400">
                    ID
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-zinc-400">
                    NAME
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-zinc-400">
                    EMAIL
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-zinc-400">
                    ROLE
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-zinc-400">
                    JOINED
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/60 transition-colors duration-200"
                  >
                    <td className="px-5 py-4 text-sm text-zinc-500">
                      {u._id?.substring(0, 8)}...
                    </td>

                    <td className="px-5 py-4 font-medium text-white">
                      {u.name}
                    </td>

                    <td className="px-5 py-4 text-sm text-zinc-400">
                      {u.email}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === "admin"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {u.role?.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-zinc-400">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
