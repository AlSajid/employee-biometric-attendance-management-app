import Board from "@/components/Board";
import Loader from "@/components/Loader";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Company() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const nameRef = useRef();
    const logo = useRef();

    useEffect(() => {
        nameRef.current.value = localStorage.getItem("company");
    }, [])

    const updateInfoHandler = (event) => {
        event.preventDefault();
        if (!nameRef.current.value) {
            toast.error("Please fill all the fields");
            return
        }

        // console.log(image)
        setLoading(true);
        fetch('http://localhost:3000/api/company', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameRef.current.value,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                    return
                }

                if (data.message === "success") {
                    toast.success("Information updated successfully");
                    localStorage.setItem("company", nameRef.current.value);
                    logo.current.value = "";
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
        <Board title="Company Information">
            <Head>
                <title>Company Information</title>
            </Head>

            <form className="flex flex-col w-11/12 mx-auto my-3" onSubmit={updateInfoHandler} >
                <div className="grid grid-cols-2 gap-7 my-1 ">
                    <div className="my-1 flex flex-col ">
                        <label>Company</label>
                        <input type="text" className="" ref={nameRef} autoComplete="off" />
                    </div>

                    {/* <div className="my-1 flex flex-col">
                        <label>Logo</label>
                        <input type="file" ref={logo} className="" maxLength={7} onChange={(e) => setImage(e.target.files[0])} />
                    </div> */}
                </div>

                <div className="flex justify-center">
                    {
                        loading ?
                            <Loader msg="Updating" />
                            :
                            <button className="">Update Information</button>
                    }
                </div>
            </form>
        </Board>
    )
}