
import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Devices() {
    const inputRef = useRef('');

    const [ipAddress, setIpAddress] = useState([]);
    const [connected, setConnected] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem("ipAddress"))
        if (item === null) setIpAddress([])
        else setIpAddress(item)
    }, [])


    const addIpAddress = (e) => {
        e.preventDefault();

        if (!validateIpAddress(inputRef.current.value)) {
            toast.error("Invalid IP address");
            return
        }

        if (ipAddress.includes(inputRef.current.value)) {
            toast.error("This IP address already exists")
            return
        }

        setIpAddress([...ipAddress, inputRef.current.value]);
        localStorage.setItem("ipAddress", JSON.stringify([...ipAddress, inputRef.current.value]));
        inputRef.current.value = "";
        toast.success("New Device added successfully");
    }

    const handleCheckConnection = async () => {
 
        if (ipAddress.length === 0) {
            toast.error("Add a Device IP Address First");
            return
        }

        setConnected([])
        setLoading(true);

        fetch("http://localhost:3000/api/connections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ipAddress),
        })
            .then((res) => res.json())
            .then((data) => setConnected(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const validateIpAddress = (ipAddress) => {
        const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return regex.test(ipAddress);
    };

    return (
        <Board title="Device Connections">

            <div className="flex flex-col m-3">
                <div className="grid grid-cols-3">
                    <form onSubmit={addIpAddress} className="col-span-2" >
                        <div className="flex gap-3 my-3 items-center">
                            <input ref={inputRef} type="text" placeholder="192.168.31.100" autoComplete="off" />
                            <button
                                className="theme-bg w-14 h-14 text-3xl flex justify-center items-center"
                                onClick={addIpAddress}>+</button>
                        </div>
                    </form>

                    <div className="my-3 col-span-1 flex justify-center items-center ">
                        {
                            loading
                                ? <Loader msg={"connecting"} />
                                :
                                <button onClick={handleCheckConnection} className="w-2/3">
                                    Test Connections
                                </button>
                        }
                    </div>

                </div>

                <div className="border-emerald-300 border"/>

                {/* devices list */}
                {
                    ipAddress?.length > 0 && (
                        <>
                            <div className="grid my-3 grid-cols-12 w-11/12 mx-auto">


                                <div className="col-span-2 table-header">No</div>
                                <div className="col-span-8 table-header">IP Address</div>
                                <div className="col-span-2 table-header">Action</div>

                                {
                                    ipAddress.map((ip, index) => (
                                        <div key={index} className="grid grid-cols-12 col-span-12 gap-5 ">

                                            <div className="col-span-2 table-content">{index + 1}</div>
                                            <div className="col-span-8 table-content">
                                                {ip}
                                                {
                                                    connected.includes(ip) && <span className=""> (Connected)</span>
                                                }

                                            </div>
                                            <div className="col-span-2 flex justify-center items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newIpAddress = ipAddress.filter((ip, i) => i !== index);
                                                        setIpAddress(newIpAddress);
                                                        localStorage.setItem("ipAddress", JSON.stringify(newIpAddress));
                                                    }}
                                                    title="remove"
                                                    className="bg-red-500 w-14 h-14 text-5xl flex justify-center items-center"
                                                >-</button>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </>
                    )}
            </div>

        </Board >
    );
}