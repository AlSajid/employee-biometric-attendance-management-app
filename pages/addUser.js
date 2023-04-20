import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function AddUser() {
    const [loading, setLoading] = useState(false);

    const nameRef = useRef();
    const idRef = useRef();

    const addUserHandler = (event) => {
        if (!nameRef.current.value || !idRef.current.value) {
            toast.error("Please fill all the fields");
            return
        }

        setLoading(true);
        event.preventDefault();

        fetch('http://localhost:3000/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameRef.current.value,
                id: idRef.current.value,
                ips: JSON.parse(localStorage.getItem('ipAddress'))
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "success") {
                    toast.success("User has been added successfully");
                    nameRef.current.value = "";
                    idRef.current.value = "";
                    return;
                }

                toast.error(data.message);
            })
            .catch(err => {
                toast.error("Something went wrong");
            })
            .finally(() => setLoading(false))
    }

    return (
        <Board title="Add User">


            <form className="flex flex-col w-96 mx-auto my-3" onSubmit={addUserHandler}>

                <div className="my-5 flex flex-col">
                    <label>Name</label>
                    <input type="text" className="" ref={nameRef} />
                </div>

                <div className="my-5 flex flex-col">
                    <label>ID</label>
                    <input type="text" ref={idRef} className="" />
                </div>

                <div className="flex justify-center items-center">
                {
                    loading ?
                        <Loader />
                        :
                        <button className=" text-white p-3  btn">Add User</button>
                }
                </div>
            </form>
        </Board>
    )
}