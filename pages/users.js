import Board from "@/components/Board";
import Loader from "@/components/Loader";
import Report from "@/pages/Report";
import getTime from "@/utilities/getTime";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUsers = () => {
        setLoading(true)
        fetch("http://localhost:3000/api/users")
            .then((response) => response.json())
            .then((data) => {
                setLoading(false)
                if (data.error) {
                    toast.error(data.error)
                    return;
                }

                setUsers(data)
            })
            .catch((err) => console.log(err.code))
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
        <Board title="Users"
            actionButton={
                <Report />
            }>

            <div className="m-5 text-white mx-auto">
                {
                    loading && !users
                        ? <Loader msg="fetching data" />
                        :
                        (
                            users?.length === 0 ?
                                <div className="text-center text-2xl font-semibold my-10 text-gray-500">No users found</div>
                                :
                                (
                                    <div className="w-full mx-auto grid grid-cols-12">
                                        <div className="col-span-3 table-header">Name</div>
                                        <div className="col-span-1 table-header">ID</div>
                                        <div className="col-span-1 table-header">Designation</div>
                                        <div className="col-span-1 table-header">Department</div>
                                        <div className="col-span-1 table-header">Section</div>
                                        <div className="col-span-1 table-header">Floor</div>
                                        <div className="col-span-1 table-header">Blood</div>
                                        <div className="col-span-1 table-header">Birthday</div>
                                        <div className="col-span-1 table-header">Joined</div>
                                        <div className="col-span-1 table-header">Actions</div>

                                        {
                                            users?.map((user, index) => (
                                                <div key={index} className="grid col-span-12 grid-cols-12">
                                                    <div className="col-span-3 table-content" style={{ justifyContent: "start" }}>
                                                        <span>{user.name}</span>
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {user.id}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {user?.designation}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {user?.department}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {user?.section}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {user?.floor}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {user?.blood}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {getTime(user?.birth, "date")}
                                                    </div>

                                                    <div className="col-span-1 table-content">
                                                        {getTime(user?.joined, "date")}
                                                    </div>

                                                    <div className="col-span-1 flex justify-around">
                                                        <Link href={`/users/${user.id}`}
                                                            className=" table-content w-1/2">
                                                            <RxOpenInNewWindow />
                                                        </Link>

                                                        <div className="bg-red-500  table-content cursor-pointer font-black
                                                        hover:bg-red-600 transition-all duration-300 ease-in-out w-1/2"
                                                            onClick={() => handleDelete(user.id)}
                                                            style={{ backgroundColor: "red" }}> -
                                                        </div>
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