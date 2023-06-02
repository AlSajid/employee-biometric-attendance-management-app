import Board from "@/components/Board";
import Loader from "@/components/Loader";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const [ips, setIps] = useState([]);

  const addUserRef = useRef();
  console.log(addUserRef);

  const nameRef = useRef();
  const idRef = useRef();
  const designationRef = useRef();
  const departmentRef = useRef();
  const ipRef = useRef();
  const birthRef = useRef();
  const floorRef = useRef();
  const sectionRef = useRef();
  const bloodRef = useRef();
  const joinedRef = useRef();

  const blood = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    const ipAddress = localStorage.getItem("ipAddress") ?? "[]";
    setIps(JSON.parse(ipAddress).map((obj) => obj.ip));
  }, []);

  const addUserHandler = async (event) => {
    event.preventDefault();

    const refs = [
      nameRef,
      idRef,
      designationRef,
      departmentRef,
      birthRef,
      floorRef,
      sectionRef,
      bloodRef,
      joinedRef,
    ];

    const isEmptyField = refs.some((ref) => !ref.current.value);
    if (isEmptyField) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:7000/api/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current.value,
          id: idRef.current.value,
          ips,
          designation: designationRef.current.value,
          department: departmentRef.current.value,
          birth: birthRef.current.value,
          floor: floorRef.current.value,
          section: sectionRef.current.value,
          blood: bloodRef.current.value,
          joined: joinedRef.current.value,
        }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.message === "success") {
        toast.success("User has been added successfully");
        refs.forEach((ref) => (ref.current.value = ""));
      }
    } catch (err) {
      // console.log(err);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Board title="Add User">

      <form
        className="flex flex-col w-11/12 mx-auto my-3"
        onSubmit={addUserHandler}
        ref={addUserRef}
      >
        <div className="grid grid-cols-3 gap-7 my-1 ">
          <div className="my-1 flex flex-col">
            <label>Device</label>

            <select ref={ipRef}>
              {ips.map((ip, index) => (
                <option
                  key={index}
                  value={ip}
                  onClick={(e) => setIp([e.target.value])}
                >
                  {ip}
                </option>
              ))}
            </select>
          </div>

          <div className="my-1 flex flex-col ">
            <label>Name</label>
            <input type="text" className="" ref={nameRef} />
          </div>

          <div className="my-1 flex flex-col">
            <label>ID</label>
            <input type="text" ref={idRef} className="" maxLength={7} />
          </div>
        </div>

        <div className="my-1 grid grid-cols-3 gap-7">
          <div className="my-1 flex flex-col">
            <label>Designation</label>
            <input type="text" ref={designationRef} className="" />
          </div>

          <div className="my-1 flex flex-col">
            <label>Department</label>
            <input type="text" ref={departmentRef} className="" />
          </div>

          <div className="my-1 flex flex-col">
            <label>Section</label>
            <input type="text" ref={sectionRef} className="" />
          </div>
        </div>

        <div className="my-1 grid grid-cols-4 gap-7">
          <div className="my-1 flex flex-col">
            <label>Floor</label>
            <input type="number" ref={floorRef} className="" />
          </div>

          <div className="my-1 flex flex-col">
            <label>Blood</label>
            <select ref={bloodRef}>
              {blood.map((blood, index) => (
                <option key={index} value={blood}>
                  {blood}
                </option>
              ))}
            </select>
          </div>

          <div className="my-1 flex flex-col">
            <label>Birthday</label>
            <input type="date" ref={birthRef} className="" />
          </div>

          <div className="my-1 flex flex-col">
            <label>Joined</label>
            <input type="date" ref={joinedRef} className="" />
          </div>
        </div>

        <div className="flex items-center justify-center my-7">
          {loading ? (
            <Loader msg="Sending" />
          ) : (
            <button className="text-white p-3 w-36 btn">Add User</button>
          )}
        </div>
      </form>
    </Board>
  );
}
