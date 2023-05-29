import Board from "@/components/Board";
import Loader from "@/components/Loader";
import getTime from "@/utilities/getTime";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/leave");
  const leaves = await res.json();
  return { props: { leaves } };
};

export default function ManageLeave({ leaves }) {
  return (
    <Board title="Manage Leave">
      <div className="rounded text-white mx-auto">
        {leaves?.length === 0 ? (
          <div className="text-center text-2xl font-semibold my-10 text-gray-500">
            No users found
          </div>
        ) : (
          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
            </thead>
            <tbody>
              {leaves?.map((leave, index) => (
                <div key={index} className="grid col-span-12 grid-cols-12">
                  <div
                    className="col-span-3 table-content"
                    style={{ justifyContent: "start" }}
                  >
                    <span>{leave.id}</span>
                  </div>

                  <div className="col-span-1 table-content">{leave.id}</div>

                  <div className="col-span-1 table-content">
                    {getTime(leave?.date, "date")}
                  </div>

                  {/* <div className="col-span-1 flex justify-around">
                  <Link
                    href={`/users/${user.id}`}
                    className=" table-content w-1/2"
                  >
                    <RxOpenInNewWindow />
                  </Link>

                  <div
                    className="bg-red-500  table-content cursor-pointer font-black
                                                        hover:bg-red-600 transition-all duration-300 ease-in-out w-1/2"
                    onClick={() => handleDelete(user.id)}
                    style={{ backgroundColor: "red" }}
                  >
                    {" "}
                    -
                  </div>
                </div> */}
                </div>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Board>
  );
}
