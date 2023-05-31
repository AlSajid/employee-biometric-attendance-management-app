import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from "react-icons/ri";

const leaveType = [
  "Annual Leave",
  "Sick Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Casual Leave",
  "Festival Leave",
  "Others",
];

export default function Leave() {
  const [loading, setLoading] = useState(false);
  const [forAll, setForAll] = useState(false);

  const idRef = useRef(null);
  const dateRef = useRef(null);
  const leaveTypeRef = useRef(null);

  useEffect(() => {
    if (forAll) {
      idRef.current.value = "";
    }
  }, [forAll]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dateRef.current.value === "" || leaveTypeRef.current.value === "") {
      toast.error("Please fill up all the fields");
      return;
    }
    console.log()
    fetch("http://localhost:3000/api/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: forAll ? "All" : idRef.current.value,
        date: dateRef.current.value,
        leaveType: leaveTypeRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Board title={"Apply Leave"}>
      <form className="flex flex-col my-3 w-11/12 mx-auto">
        <div className="my-3 flex flex-col w-1/3 mx-auto">
          <div className="my-1 flex items-center justify-center">
            {forAll ? (
              <RiCheckboxCircleFill
                className="text-3xl cursor-pointer"
                onClick={() => setForAll(false)}
              />
            ) : (
              <RiCheckboxCircleLine
                className="text-3xl cursor-pointer"
                onClick={() => setForAll(true)}
              />
            )}

            <label
              className="ml-3 select-none"
              onClick={() => setForAll(!forAll)}
            >
              Apply to all users
            </label>
          </div>

          <div className="my-3 flex flex-col">
            <label>User ID</label>
            <input
              type="text"
              className="disabled:bg-slate-300 text-center"
              ref={idRef}
              disabled={forAll}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label>Date</label>
            <input type="date" className="" ref={dateRef} />
          </div>

          <div className="my-3 flex flex-col">
            <label>Leave Type</label>

            <select ref={leaveTypeRef}>
              {leaveType.map((leave, index) => (
                <option
                  key={index}
                  value={leave}
                  onClick={(e) => setIp([e.target.value])}
                >
                  {leave}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center my-7">
          {loading ? (
            <Loader msg="updating" />
          ) : (
            <button onClick={handleSubmit}>Register Leave</button>
          )}
        </div>
      </form>
    </Board>
  );
}
