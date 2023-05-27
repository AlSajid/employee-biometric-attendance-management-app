import Board from "@/components/Board";
import Link from "next/link";
import Head from "next/head";
import HomeButton from "@/components/HomeButton";
import menu from "@/public/options";

export default function home() {

    return (
        <Board title="Home">
            <Head>
                <title>Home</title>
            </Head>

            <div className="flex gap-10 m-10 flex-wrap justify-center">
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
    )
}