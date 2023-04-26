import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function AddUser() {
    const [loading, setLoading] = useState(false);

    const nameRef = useRef();
    const idRef = useRef();
    const designationRef = useRef();
    const departmentRef = useRef();

    const addUserHandler = (event) => {
        event.preventDefault();
        if (!nameRef.current.value || !idRef.current.value || !designationRef.current.value || !departmentRef.current.value) {
            toast.error("Please fill all the fields");
            return
        }

        setLoading(true);

        fetch('http://localhost:3000/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameRef.current.value,
                id: idRef.current.value,
                ips: JSON.parse(localStorage.getItem('ipAddress')),
                designation: designationRef.current.value,
                department: departmentRef.current.value
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    toast.error(data.error);
                }

                if (data.message === "success") {
                    toast.success("User has been added successfully");
                    nameRef.current.value = "";
                    idRef.current.value = "";
                    designationRef.current.value = "";
                    departmentRef.current.value = "";
                    return;
                }


            })
            .catch(err => {
                toast.error("Something went wrong");
            })
            .finally(() => setLoading(false))
    }

    return (
        <Board title="Add User">


            <form className="flex flex-col w-2/3 mx-auto my-3" onSubmit={addUserHandler}>
                <div className="flex gap-5 my-1">
                    <div className="my-1 flex flex-col">
                        <label>Name</label>
                        <input type="text" className="" ref={nameRef} />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>ID</label>
                        <input type="text" ref={idRef} className="" />
                    </div>
                </div>

                <div className="my-1 flex gap-5">
                    <div className="my-1 flex flex-col">
                        <label>Designation</label>
                        <input type="text" ref={designationRef} className="" />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Department</label>
                        <input type="text" ref={departmentRef} className="" />
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    {
                        loading ?
                            <Loader msg="Sending" />
                            :
                            <button className="text-white p-3  btn">Add User</button>
                    }
                </div>
            </form>
        </Board>
    )
}