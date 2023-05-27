import Board from "@/components/Board";
import Loader from "@/components/Loader";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function AddUser() {
    const [loading, setLoading] = useState(false);
    const [ips, setIps] = useState([]);

    const nameRef = useRef();
    const idRef = useRef();
    const designationRef = useRef();
    const departmentRef = useRef();
    const ipRef = useRef();
    const birthRef = useRef();
    const floorRef = useRef();
    const sectionRef = useRef();
    const bloodRef = useRef();
    const joinedRef = useRef();

    const blood = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    useEffect(() => {
        const ipAddress = localStorage.getItem('ipAddress') ?? '[]';
        setIps(JSON.parse(ipAddress).map(obj => obj.ip));
    }, []);


    const addUserHandler = (event) => {
        event.preventDefault();
        if (!nameRef.current.value || !idRef.current.value || !designationRef.current.value || !departmentRef.current.value) {
            toast.error("Please fill all the fields");
            return
        }

        setLoading(true);
        fetch('http://localhost:3000/api/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameRef.current.value,
                id: idRef.current.value,
                ips,
                designation: designationRef.current.value,
                department: departmentRef.current.value,
                birth: birthRef.current.value,
                floor: floorRef.current.value,
                section: sectionRef.current.value,
                blood: bloodRef.current.value,
                joined: joinedRef.current.value,
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.error) {
                    toast.error(data.error);
                    return
                }

                if (data.message === "success") {
                    toast.success("User has been added successfully");
                    nameRef.current.value = "";
                    idRef.current.value = "";
                    designationRef.current.value = "";
                    departmentRef.current.value = "";
                    birthRef.current.value = "";
                    floorRef.current.value = "";
                    sectionRef.current.value = "";
                    bloodRef.current.value = "";
                    joinedRef.current.value = "";
                    return;
                }
            })
            .catch(err => {
                // console.log(err);
                // toast.error("Something went to Evan");
            })
            .finally(() => setLoading(false))
    }

    return (
        <Board title="Add User">
            <Head>
                <title>Add User</title>
            </Head>

            <form className="flex flex-col w-11/12 mx-auto my-3" onSubmit={addUserHandler}>
                <div className="grid grid-cols-3 gap-7 my-1 ">
                    <div className="my-1 flex flex-col">
                        <label>Device</label>

                        <select ref={ipRef}>
                            {
                                ips.map((ip, index) =>
                                    <option key={index} value={ip}
                                        onClick={(e) => setIp([e.target.value])}>{ip}</option>)
                            }
                        </select>
                    </div>

                    <div className="my-1 flex flex-col ">
                        <label>Name</label>
                        <input type="text" className="" ref={nameRef} />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>ID</label>
                        <input type="text" ref={idRef} className="" maxLength={7} />
                    </div>
                </div>

                <div className="my-1 grid grid-cols-3 gap-7">
                    <div className="my-1 flex flex-col">
                        <label>Designation</label>
                        <input type="text" ref={designationRef} className="" />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Department</label>
                        <input type="text" ref={departmentRef} className="" />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Section</label>
                        <input type="text" ref={sectionRef} className="" />
                    </div>
                </div>

                <div className="my-1 grid grid-cols-4 gap-7">
                    <div className="my-1 flex flex-col">
                        <label>Floor</label>
                        <input type="number" ref={floorRef} className="" />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Blood</label>
                        <select ref={bloodRef}>
                            {
                                blood.map((blood, index) =>
                                    <option key={index} value={blood}>{blood}</option>)
                            }
                        </select>
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Birthday</label>
                        <input type="date" ref={birthRef} className="" />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Joined</label>
                        <input type="date" ref={joinedRef} className="" />
                    </div>
                </div>

                <div className="flex items-center">
                    {
                        loading ?
                            <Loader msg="Sending" />
                            :
                            <button className="text-white p-3 w-36 btn">Add User</button>
                    }
                </div>
            </form>
        </Board>
    )
}