import Board from "@/components/Board";
import Loader from "@/components/Loader";
import AddIP from "@/components/devices/AddIP";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Connections() {
  const [ipAddress, setIpAddress] = useState([]);
  const [connected, setConnected] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckConnection = async () => {
    if (ipAddress.length === 0) {
      toast.error("Add a Device IP Address First");
      return;
    }

    setConnected([]);
    setLoading(true);

    fetch("http://localhost:3000/api/connections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ipAddress.map((obj) => obj.ip)),
    })
      .then((res) => res.json())
      .then((data) => {
        setConnected(data);
        toast.success(
          (data.length > 0 ? data.length : "No ") +
            (data.length > 1 ? " devices are " : " device is ") +
            "connected"
        );
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <Board
      title="Device Connections"
      actionButton={
        <div className="">
          {loading ? (
            <Loader msg={"connecting"} />
          ) : (
            <button onClick={handleCheckConnection} className="">
              Test Connections
            </button>
          )}
        </div>
      }
    >
      <div className="flex flex-col m-3">
        <AddIP
          ipAddress={ipAddress}
          setIpAddress={setIpAddress}
          setConnected={setConnected}
        />

        <div className="border-teal-300 border-2 m-3" />

        {/* devices list */}
        {ipAddress?.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>IP Address</th>
                  <th colSpan={3}>Device Info</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ipAddress.map((device, index) => (
                  <tr key={index}>
                    <td className="">{index + 1}</td>
                    <td
                      className={
                        connected.includes(device.ip) &&
                        "cursor-pointer bg-green-300 text-white"
                      }
                    >
                      {device.ip + " "}
                      {connected.includes(device.ip) && (
                        <span className="ml-3 animate-pulse">(Connected)</span>
                      )}
                    </td>

                    <td colSpan={3}>{device.tag}</td>

                    <td
                      className="  hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
                      onClick={() => {
                        const newIpAddress = ipAddress.filter(
                          (ip, i) => i !== index
                        );
                        setIpAddress(newIpAddress);
                        localStorage.setItem(
                          "ipAddress",
                          JSON.stringify(newIpAddress)
                        );
                        toast.success(device.ip + ` has been disconnected`);
                      }}
                      title="Remove"
                    >
                      Remove
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </Board>
  );
}
