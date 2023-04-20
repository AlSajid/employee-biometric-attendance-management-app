import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Hours({ data }) {
    const [loading, setLoading] = useState(false);

    const startRef = useRef();
    const endRef = useRef();
    const lateRef = useRef();

    useEffect(() => {
        fetch("http://localhost:3000/api/hours")
            .then(res => res.json())
            .then(data => {
                if (startRef.current.value) {
                    startRef.current.value = data.start;
                    lateRef.current.value = data.late;
                    endRef.current.value = data.end;
                }
            })
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const start = startRef.current.value;
        const late = lateRef.current.value;
        const end = endRef.current.value;
        console.log(typeof start, typeof late, typeof end);

        const update = fetch("http://localhost:3000/api/hours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ start, late, end })
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

        toast.promise(update, {
            loading: "Updating...",
            success: (response) => {
                if (response === "success") {
                    return "Office hour has been updated!";
                }
                else throw new Error();
            },
            error: "Something went wrong!",
        });
    }

    return (
        <Board title={"Office Hours"}>
            <div className="m-3 flex justify-center items-center">

                <form className="flex flex-col ">
                    <div className="my-1 flex flex-col">
                        <label>Start</label>
                        <input type="time" className="w-96" ref={startRef} />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Late</label>
                        <input type="time" className="w-96" ref={lateRef} />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>End</label>
                        <input type="time" className="w-96" ref={endRef} />
                    </div>

                    <div className="flex justify-center items-center ">
                        {
                            loading ?
                                <Loader msg="updating" />
                                :
                                <button
                                    onClick={handleSubmit}
                                    className="btn w-1/3">Set Time</button>
                        }
                    </div>
                </form>
            </div>
        </Board>
    );
}