import Board from "@/components/Board";
import Loader from "@/components/Loader";
import getTime from "@/utilities/getTime";
import XLSX from "xlsx";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function getCurrentMonthDates() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const firstDate = `${year}-${month}-01`;
  const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const lastDate = `${year}-${month}-${lastDay}`;

  return { firstDate, lastDate };
}

export default function User() {
  const { firstDate, lastDate } = getCurrentMonthDates();

  const router = useRouter();
  const { userID } = router.query;
  const [mainAttendance, setMainAttendance] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState([]);
  const [start, setStart] = useState(firstDate);
  const [end, setEnd] = useState(lastDate);

  const download = useCallback(async () => {
    const table = document.getElementById("Table2XLSX");
    const wb = XLSX.utils.table_to_book(table);

    XLSX.writeFile(wb, `${userID}.xlsx`);
  });

  const loadData = () => {
    setLoading(true);

    fetch("http://localhost:7777/api/report", {
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
        <div className="justify-center items-center flex">
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
          <button className="mx-3" onClick={()=>loadData()}>
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
                  <td>{getTime(data.recordTime, "date")}</td>
                  <td>{getTime(data.recordTime, "time")}</td>
                  <td>{data.ip}</td>
                  <td>{getType(getTime(data.recordTime, "compare"))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Board>
  );
}
