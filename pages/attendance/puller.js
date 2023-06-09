import Board from "@/components/Board";
import Loader from "@/components/Loader";
import getTime from "@/utilities/getTime";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const backupAttendance = (data) => {
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    attendance.push(...data);
    localStorage.setItem("attendance", JSON.stringify(attendance));
    console.log(attendance);

    fetch("http://localhost:7000/api/backupAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendance),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Attendance backed up");
          localStorage.setItem("attendance", null);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchAttendance = () => {
    setLoading(true);
    setAttendance([]);

    const ipAddress = localStorage.getItem("ipAddress") ?? "[]";
    const ips = JSON.parse(ipAddress).map((obj) => obj.ip);

    fetch("http://localhost:7000/api/getAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ips),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }

        if (data.length > 0) {
          backupAttendance(data);
        }

        if (data.length === 0) {
          toast.success("No new attendance");
        }

        setAttendance(data);
      })
      .catch((err) => console.log("error:" + err))
      .finally(() => setLoading(false));
  };

  return (
    <Board
      title={"Backup Data"}
      actionButton={
        <>
          {loading ? (
            <Loader msg="pulling data" />
          ) : (
            <button onClick={fetchAttendance}>Pull & Backup</button>
          )}
        </>
      }
    >
      <div className="flex flex-col items-center justify-center mx-auto">
        {attendance.length > 0 && (
          <table>
            <thead>
              <th>ID</th>
              <th>IP</th>
              <th>time</th>
            </thead>

            {attendance.map((item) => (
              <tr key={item._id}>
                <td>{item.deviceUserId}</td>
                <td>{item.ip}</td>
                <td>{getTime(item.recordTime)}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </Board>
  );
}
