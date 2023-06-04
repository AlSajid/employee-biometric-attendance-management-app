import Board from "@/components/Board";
import Report from "@/pages/Report";

export async function getServerSideProps() {
    const res = await fetch("http://localhost:7000/api/users");
    const users = await res.json();
    return { props: { users } };
}

export default function AttendanceReport({ users}) {
 
  return (
    <Board title={"Attendance Report"} actionButton={<Report users={users} />}>
    </Board>
  );
}