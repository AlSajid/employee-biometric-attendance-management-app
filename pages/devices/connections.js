
import Board from "@/components/Board";
import Loader from "@/components/Loader";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Connections() {
    const inputRef = useRef('');
    const tagRef = useRef('');

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

        if (inputRef.current.value === "") {
            toast.error("Enter the IP address first");
            return
        }

        if (!validateIpAddress(inputRef.current.value)) {
            toast.error("Invalid IP address");
            return
        }

        const duplicate = ipAddress.filter((device) => device.ip === inputRef.current.value);
        if (duplicate.length > 0) {
            toast.error("This IP address already exists")
            return
        }

        setIpAddress([
            ...ipAddress,
            {
                ip: inputRef.current.value,
                tag: tagRef.current.value
            }
        ]);

        setConnected([]);

        localStorage.setItem("ipAddress", JSON.stringify([...ipAddress, {
            ip: inputRef.current.value,
            tag: tagRef.current.value
        }]));

        inputRef.current.value = "";
        tagRef.current.value = "";
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
            body: JSON.stringify(ipAddress.map(obj => obj.ip)),
        })
            .then((res) => res.json())
            .then((data) => {
                setConnected(data)
                toast.success(
                    ((data.length > 0) ? data.length : "No ") +
                    ((data.length > 1) ? " devices are " : " device is ") +
                    'connected'
                )
            })
            .catch((err) => toast.error(err))
            .finally(() => setLoading(false));
    };

    const validateIpAddress = (ipAddress) => {
        const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return regex.test(ipAddress);
    };

    return (
        <Board title="Device Connections" actionButton={
            <div className="">
                {
                    loading
                        ? <Loader msg={"connecting"} />
                        :
                        <button onClick={handleCheckConnection} className="">Test Connections</button>
                }
            </div>
        }>

            <Head>
                <title>Device Connections</title>
            </Head>

            <div className="flex flex-col m-3">

                <form onSubmit={addIpAddress} className="col-span-3" >
                    <div className="grid grid-cols-12 gap-3 ">
                        <div className="col-span-3 flex flex-col">
                            <label>Device IP</label>
                            <input ref={inputRef} type="text" placeholder="192.168.31.100" autoComplete="off" />
                        </div>

                        <div className="col-span-8 flex flex-col">
                            <label>Device Information</label>
                            <input ref={tagRef} type="text" placeholder="Device Info" autoComplete="off" />


                        </div>

                        <div className="self-end">
                            <button
                                className="col-span-1 theme-bg flex justify-items-center"
                                onClick={addIpAddress}>+</button>
                        </div>
                    </div>
                </form>




                <div className="border-teal-300 border-2 m-3" />

                {/* devices list */}
                {
                    ipAddress?.length > 0 &&
                    (
                        <>
                            <div className="grid my-3 grid-cols-12 w-11/12 mx-auto">
                                <div className="col-span-1 table-header">No</div>
                                <div className="col-span-4 table-header">IP Address</div>
                                <div className="col-span-6 table-header">Device Info</div>
                                <div className="col-span-1 table-header">Action</div>
                                {
                                    ipAddress.map((device, index) => (
                                        <div key={index} className="grid grid-cols-12 col-span-12 gap-3 ">

                                            <div className="col-span-1 table-content">{index + 1}</div>
                                            <div className="col-span-4 table-content cursor-pointer"
                                                style={{ backgroundColor: (connected.includes(device.ip)) ? "rgb(34 197 94)" : "rgb(100 116 139" }}>
                                                {device.ip + " "}
                                                {
                                                    connected.includes(device.ip) && <span className="ml-3 animate-pulse">(Connected)</span>
                                                }
                                            </div>

                                            <div className="col-span-6 table-content cursor-pointer">
                                                {device.tag}
                                            </div>

                                            <div className="col-span-1 flex justify-center items-center table-content hover:bg-red-500 cursor-pointer"
                                                onClick={() => {
                                                    const newIpAddress = ipAddress.filter((ip, i) => i !== index);
                                                    setIpAddress(newIpAddress);
                                                    localStorage.setItem("ipAddress", JSON.stringify(newIpAddress));
                                                    toast.success(device.ip + ` has been disconnected`);
                                                }}
                                                title="Remove"
                                            >

                                                -

                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </>
                    )
                }
            </div>



        </Board >
    );
}