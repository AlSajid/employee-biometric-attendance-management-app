import Board from "@/components/Board";
import Clock from "react-live-clock";

export default function Home() {
  return (
    <Board title="Home">
      <div className="flex gap-10 m-10 flex-wrap justify-center">
        <Clock
          noSsr={true}
          className="text-9xl text-teal-700 font-bold font-mono oldstyle-nums tracking-widest"
          format={"hh:mm:ss"}
          timezone={"Asia/Dhaka"}
          ticking={true}
        />
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
