import Link from "next/link";
import menu from "../public/options";
import { useRouter } from "next/router";
import Image from "next/image";


export default function Navigation({ logo }) {
    const router = useRouter();

    return (
        <nav className="w-80 h-screen py-3 text-white flex flex-col">
            <div className="my-3 p-3 flex justify-center items-center h-16">
                {
                    logo &&
                        <Image src={logo} alt="logo" width={0} height={0}
                            style={{ height: "auto", width: "" }} />
                }
            </div>

            <div className="theme-grad h-full flex flex-col justify-around items-center rounded-r-xl ">
                {
                    menu.map((item, index) => (
                        <div key={index} className="h-16 hover:h-60 overflow-hidden transition-all duration-300 ease-out">
                            <button type="button"
                                className="w-60 h-16 p-3 font-semibold rounded-lg flex items-center hover:bg-teal-700
                                                        transition-all duration-300 ease-in-out "
                                style={{ backgroundColor: (router.pathname === item.path) ? "#338070" : null }}>
                                <span className="text-3xl mr-3">{item.icon}</span>
                                <span className="text-3xl">{item.option}</span>
                            </button>

                            <div className="overflow-y-scroll h-44 bg-teal-500 ">
                                {
                                    item?.sub?.map((options, index) => (
                                        <Link
                                            key={index}
                                            href={`${options.path}`}
                                            className="w-full bg-green-50 overflow-y-scroll">
                                            <button type="button" className="w-60 p-3 font-semibold rounded flex items-center hover:bg-teal-700 
                                                                                    transition-all duration-300 ease-in-out"
                                                style={{ backgroundColor: (router.pathname === options.path) ? "#338070" : null }}>
                                                <div className="text-xl">{options.name}</div>
                                            </button>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>

                    ))
                }
            </div>
        </nav>
    )
}