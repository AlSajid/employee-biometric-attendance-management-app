import HomeButton from "@/components/HomeButton";
import menu from "../public/options";
import Board from "@/components/Board";
import Link from "next/link";

export default function home() {

    return (
        <Board title="Home">
            <div className="flex gap-10 m-10 flex-wrap justify-center">
                {
                    menu.map((option, index) =>
                        (index !== 0) &&
                        <Link href={option.path} key={index}>
                            <HomeButton menu={option} />
                        </Link>
                    )
                }
            </div>
        </Board>
    )
}