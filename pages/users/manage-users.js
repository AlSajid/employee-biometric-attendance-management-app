import Board from "@/components/Board";
import Report from "@/pages/Report";
import getTime from "@/utilities/getTime";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RxOpenInNewWindow } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
          return;
        }

        setUsers(data);
      })
      .catch((err) => console.log(err.code));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <span className="text-xl my-3 font-semibold block">
          Do you want to delete this user?
        </span>
        <div className="my-1 flex justify-center items-center">
          <button
            className="p-2 w-20 rounded text-white bg-red-500"
            onClick={() => {
              toast.dismiss(t.id);

              fetch("http://localhost:3000/api/deleteUser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id,
                  ips: JSON.parse(localStorage.getItem("ipAddress")).map(
                    (obj) => obj.ip
                  ),
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.message === "success") {
                    toast.success("User has been deleted successfully");
                    loadUsers();
                  } else {
                    toast.error("Something went wrong");
                  }
                });
            }}
          >
            Delete
          </button>

          <button
            className="bg-gray-100 p-2 w-20 rounded mx-3"
            onClick={() => {
              toast.dismiss(t.id);
              return;
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    ));
  };

  return (
    <Board title="Users" actionButton={<Report users={users} />}>
      {users?.length === 0 ? (
        <div className="text-center text-2xl font-semibold my-10 text-gray-500">
          No users found
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Section</th>
              <th>Floor</th>
              <th>Blood</th>
              <th>Birthday</th>
              <th>Joined</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td style={{ justifyContent: "start" }}>{user.name}</td>
                <td>{user.id}</td>
                <td>{user?.designation}</td>
                <td>{user?.department}</td>
                <td>{user?.section}</td>
                <td>{user?.floor}</td>
                <td>{user?.blood}</td>
                <td>{getTime(user?.birth, "date")}</td>
                <td>{getTime(user?.joined, "date")}</td>
                <td>
                  <Link
                    href={`/users/${user.id}`}
                    className="flex justify-center items-center text-xl"
                  >
                    <RxOpenInNewWindow />
                  </Link>
                </td>
                <td
                  className="text-red-500  hover:bg-red-600 hover:text-white cursor-pointer font-black
                                  transition-all duration-300 ease-in-out"
                  onClick={() => handleDelete(user.id)}
                >
                  <TiDeleteOutline />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Board>
  );
}
