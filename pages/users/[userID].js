import Board from "@/components/Board";
import Loader from "@/components/Loader";
import getTime from "@/utilities/getTime";
import XLSX from "xlsx";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function User() {
  const router = useRouter();
  const { userID } = router.query;
  const [mainAttendance, setMainAttendance] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const download = useCallback(async () => {
    const table = document.getElementById("Table2XLSX");
    const wb = XLSX.utils.table_to_book(table);

    XLSX.writeFile(wb, `${userID}.xlsx`);
  });

  const loadData = () => {
    setLoading(true);

    fetch("http://localhost:3000/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        filter: { start, end },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }

        setAttendance(data.attendance);
        setMainAttendance(data.attendance);
        setHours(data.hours);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleFilter = () => {
    const filtered = mainAttendance.filter(
      (item) =>
        new Date(start) <= new Date(item.recordTime) &&
        new Date(end) >= new Date(item.recordTime)
    );
    setAttendance(filtered);
  };

  useEffect(() => {
    if (!userID) return;
    loadData();
  }, [userID]);

  const getType = (time) => {
    const convertToNumber = (time) => {
      return parseInt(time.slice(0, 2) + time.slice(3) + "00");
    };

    const start = convertToNumber(hours.start);
    const late = convertToNumber(hours.late);
    const end = convertToNumber(hours.end);

    if (time <= start) return "Early In";
    if (start < time && time < late) return "Late";
    if (time < end) return "Early Out";
    if (end < time) return "Out";
  };

  return (
    <Board
      title={`User ID ${userID}`}
      actionButton={
        <div className="justify-center items-center flex w-full my-5">
          <input
            type="date"
            className=""
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            type="date"
            className=""
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button className="mx-3" onClick={handleFilter}>
            Filter
          </button>
          <button onClick={download}>Export</button>
        </div>
      }
    >
      {loading ? (
        <Loader msg="fetching" />
      ) : (
        <div className="m-3">
          <table id="Table2XLSX" className="">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Device ID</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((data, index) => (
                <tr key={index} className="">
                  <td className="">{getTime(data.recordTime, "date")}</td>
                  <td className="">{getTime(data.recordTime, "time")}</td>
                  <td className="">{data.ip}</td>
                  <td className="">
                    {getType(getTime(data.recordTime, "compare"))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div className="w-11/12 mx-auto grid grid-cols-12">
            {/* headers */}
            <span className="col-span-3 table-header">Date</span>
            <span className="col-span-3 table-header">Time</span>
            <span className="col-span-4 table-header">Device ID</span>
            <span className="col-span-2 table-header">Type</span>

            {attendance.map((data, index) => (
              <div
                key={index}
                className="col-span-12 grid grid-cols-12  text-white"
              >
                <div className="table-content col-span-3 ">
                  {getTime(data.recordTime, "date")}
                </div>
                <div className="table-content col-span-3 ">
                  {getTime(data.recordTime, "time")}
                </div>
                <div className="table-content col-span-4 ">{data.ip}</div>
                <div className="table-content col-span-2 ">
                  {getType(getTime(data.recordTime, "compare"))}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </Board>
  );
}
