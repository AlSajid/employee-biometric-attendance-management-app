import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Hours({ data }) {
    const [loading, setLoading] = useState(false);

    const [start, setStart] = useState("");
    const [late, setLate] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/hours")
            .then(res => res.json())
            .then(data => {
                setStart(data.start);
                setLate(data.late);
                setEnd(data.end);
            })
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const update = fetch("http://localhost:3000/api/hours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ start, late, end })
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => toast.error(err))
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
                        <input type="time" className="w-96" value={start} onChange={(e) => setStart(e.target.value)} />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>Late</label>
                        <input type="time" className="w-96" value={late} onChange={(e)=> setLate(e.target.value)} />
                    </div>

                    <div className="my-1 flex flex-col">
                        <label>End</label>
                        <input type="time" className="w-96" value={end} onChange={(e) => setEnd(e.target.value)} />
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