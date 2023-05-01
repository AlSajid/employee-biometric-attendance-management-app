import Board from "@/components/Board";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = () => {
        setLoading(true)
        fetch("http://localhost:3000/api/users")
            .then((response) => response.json())
            .then((data) => {

                if (data.error) {
                    toast.error(data.error)
                    return;
                }

                setUsers(data)
            })
            .catch((err) => console.log(err.code))
            .finally(setLoading(false))
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = (id) => {

        toast((t) => (
            <div>
                <span className="text-xl my-3 font-semibold block">Do you want to delete this user?</span>
                <div className="my-1 flex justify-center items-center">
                    <button className="p-2 w-20 rounded text-white"
                        onClick={() => {
                            toast.dismiss(t.id)

                            fetch("http://localhost:3000/api/deleteUser", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    id,
                                    ips: JSON.parse(localStorage.getItem("ipAddress")).map(obj => obj.ip),
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

                        }}>Delete</button>

                    <button
                        className="bg-gray-100 p-2 w-20 rounded mx-3"
                        onClick={() => {
                            toast.dismiss(t.id)
                            return;
                        }}>Dismiss</button>
                </div>
            </div>
        ));

    }

    return (
        <Board title="Users">
            <div className="m-5 text-white w-11/12 mx-auto">

                {
                    loading ? <Loader msg="fetching data" />
                        :
                        (
                            users?.length === 0 ?
                                <div className="text-center text-2xl font-semibold my-10 text-gray-500">No users found</div>
                                :
                                (<div className="w-full mx-auto grid grid-cols-12 ">

                                    <div className="col-span-3 table-header">Name</div>
                                    <div className="col-span-2 table-header">ID</div>
                                    <div className="col-span-2 table-header">Designation</div>
                                    <div className="col-span-2 table-header">Department</div>
                                    <div className="col-span-1 table-header">View</div>
                                    <div className="col-span-1 table-header">Action</div>

                                    {
                                        users?.map((user, index) => (
                                            <div key={index} className="grid col-span-12 grid-cols-12">

                                                <div className="col-span-3 table-content" style={{ textAlign: "left" }}>
                                                    <span>{user.name}</span>
                                                </div>

                                                <div className="col-span-2 table-content">
                                                    {user.id}
                                                </div>

                                                <div className="col-span-2 table-content">
                                                    {user?.designation}
                                                </div>

                                                <div className="col-span-2 table-content">
                                                    {user?.department}
                                                </div>

                                                <Link href={`/users/${user.id}`} className="col-span-1 flex justify-center items-center">
                                                    <button className="w-14 h-14 text-5xl flex justify-center items-center"><RxOpenInNewWindow /></button>
                                                </Link>

                                                <div className="col-span-1 flex justify-center items-center">
                                                    <button type="button" className="w-14 h-14 text-5xl flex justify-center items-center bg-red-500"
                                                        onClick={() => handleDelete(user.id)}> -
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>)
                        )

                }
            </div>
        </Board >
    )

}