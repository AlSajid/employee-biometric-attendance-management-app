import Board from '@/components/Board';
import Loader from '@/components/Loader';
import getTime from '@/utilities/getTime';
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

export default function Home() {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)

  const backupAttendance = (data) => {
    const attendance = JSON.parse(localStorage.getItem('attendance')) || []
    attendance.push(...data)
    localStorage.setItem('attendance', JSON.stringify(attendance))

    fetch("http://localhost:3000/api/backupAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attendance }),
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success("Attendance backed up")
          localStorage.setItem('attendance', null)
        }
      })
      .catch(err => console.log(err))
  }

  const fetchAttendance = () => {
    setLoading(true)
    fetch("http://localhost:3000/api/getAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: localStorage.getItem("ipAddress"),
    })
      .then(res => res.json())
      .then(data => {

        if (data.length > 0) {
          backupAttendance(data)
          setAttendance(data)
        }

        if (data.length === 0) {
          toast.success("No new attendance")
        }

      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  // const socket = new WebSocket('ws://localhost:3333');

  // socket.addEventListener('message', (event) => {
  //   console.log(event.data);
  // });

  return (
    <Board title={"Backup Data"}>
      <div className="flex flex-col items-center justify-center mx-auto">
        <button className='my-3' onClick={fetchAttendance}>Fetch & Backup</button>
        {
          loading && <Loader />
        }
        {
          attendance.length > 0 &&

          <div className='m-3 w-11/12 mx-auto grid grid-cols-12'>

            <span className='col-span-4 table header'>ID</span>
            <span className='col-span-4 table header'>IP</span>
            <span className='col-span-4 table header'>time</span>

            {

              attendance.map((item, index) => (
                <tr key={index}>
                  <td className='col-span-4 table-content'>{item.deviceUserId}</td>
                  <td className='col-span-4 table-content'>{item.ip}</td>
                  <td className='col-span-4 table-content'>{getTime(item.recordTime)}</td>
                </tr>
              ))
            }

          </div>
        }
      </div >
    </Board >
  )
}
