import Board from "@/components/Board";
import { useRef } from "react";
import { toast } from "react-hot-toast";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/leave-types");
  const leaveTypes = await res.json();
  return { props: { leaveTypes } };
};

export default function LeaveType({ leaveTypes }) {
  const leaveTypeRef = useRef(null);
  const leaveCountRef = useRef(null);
  console.log(leaveTypes);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      leaveTypeRef.current.value === "" ||
      leaveCountRef.current.value === ""
    ) {
      toast.error("Please fill up all the fields");
      return;
    }

    fetch("http://localhost:3000/api/leave-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: leaveTypeRef.current.value,
        count: leaveCountRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
        }
      });
  };

  const handleDelete = (id) => {

  }

  return (
    <Board title={"Leave Types"}>
      <form className="grid grid-cols-3 gap-7 p-7" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label>Leave Type</label>
          <input type="text" ref={leaveTypeRef} />
        </div>

        <div className="flex flex-col">
          <label>Leave Count</label>
          <input type="number" ref={leaveCountRef} />
        </div>
        <div className="flex items-end">
          <button>Add</button>
        </div>
      </form>

      <hr />

      <table className="my-3">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Leave Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.type} Leave</td>
              <td>{leave.count}</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Board>
  );
}
