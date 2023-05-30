import Board from "@/components/Board";

export default function leaveType() {
  return (
    <Board title={"Leave Types"}>
      <div className="grid grid-cols-3 gap-7 p-7">
        <div className="flex flex-col ">
          <label>Leave Type</label>
          <input type="text" />
        </div>

        <div className="flex flex-col">
          <label>Leave Count</label>
          <input type="number" />
        </div>
        <div className="flex items-end">
          <button>Add</button>
        </div>
      </div>

      <hr />

      <table className="m-3">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Leave Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annual Leave</td>
            <td>10</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </table>
    </Board>
  );
}
