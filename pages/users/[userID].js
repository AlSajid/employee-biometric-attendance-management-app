import Board from "@/components/Board";
import getTime from "@/utilities/getTime";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function User() {
    const router = useRouter();
    const { userID } = router.query;
    const [attendance, setAttendance] = useState([])
    const [hours, setHours] = useState([])
    console.log(userID)

    useEffect(() => {
        // if(usersID===undefined) {
        //     console.log(usersID)
        //     return;
        // };

        fetch("http://localhost:3000/api/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAttendance(data.attendance)
                setHours(data.hours)
            })
            .catch(err => console.log(err))

    }, [])


    const getType = (time) => {
        const convertToNumber = (time) => {
            return parseInt(time.slice(0, 2) + time.slice(3) + "00");
        }

        const start = convertToNumber(hours.start);
        const late = convertToNumber(hours.late);
        const end = convertToNumber(hours.end);

        if (time < start) return "Early In";
        if (start < time && time < late) return "On-Time In";
        if (time < end) return "Early Out";
        if (end < time) return "On-Time Out"
    }

    return (
        <Board title={`(${userID})`}>
            <div className="m-3">
                <div className="w-11/12 mx-auto grid grid-cols-12">

                    {/* headers */}
                    <span className="col-span-3 table-header">Date</span>
                    <span className="col-span-3 table-header">Time</span>
                    <span className="col-span-4 table-header">Device ID</span>
                    <span className="col-span-2 table-header">Type</span>

                    {
                        attendance.map((data, index) =>
                            <div key={index} className="col-span-12 grid grid-cols-12  text-white">
                                <div className="table-content col-span-3 ">{getTime(data.recordTime, "date")}</div>
                                <div className="table-content col-span-3 ">{getTime(data.recordTime, "time")}</div>
                                <div className="table-content col-span-4 ">{data.ip}</div>
                                <div className="table-content col-span-2 ">{getType(getTime(data.recordTime, "compare"))}</div>
                            </div>
                        )
                    }

                </div>
            </div>
        </Board>
    )
}