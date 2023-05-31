import Board from "@/components/Board";
import { useState } from "react";
import Clock from "react-live-clock";
import getTime from "@/utilities/getTime";

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <Board title="Home">
      <div className="flex gap-10 m-10 flex-col items-center justify-center">
        <Clock
          noSsr={true}
          className="text-7xl text-teal-950 font-bol font-mono"
          format={"hh:mm:ss"}
          timezone={"Asia/Dhaka"}
          ticking={true}
        />
        <span className="text-3xl  text-teal-950 font-thin font-mono">{getTime(date, "date")}</span>
        {/* {
                    menu.map((option, index) =>
                        {
                            options
                        }
                        <Link href={option.path} key={index}>
                            <HomeButton menu={option} />
                        </Link>
                    )
                } */}
      </div>
    </Board>
  );
}
