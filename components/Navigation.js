import Link from "next/link";
// import { RxHamburgerMenu } from "react-icons/rx";
import menu from "../public/options";
import { useRouter } from "next/router";

export default function Navigation() {
    const router = useRouter()

    return (
        <nav className="w-24 p-5 hover:w-96 hover:p-3 ml-12 text-white rounded-xl theme-grad
                        flex flex-col gap-1 justify-around items-center
                        transition-all duration-500 ease-in-out overflow-hidden"
        >

            {/* <div className="flex justify-center p-3">
                <span className=" text-3xl text-center"><RxHamburgerMenu /></span>
            </div> */}

            {
                menu.map((item, index) => (
                    <Link href={`${item.path}`} key={index} className="w-full">
                        <button type="button" className="w-72 rounded-xl flex items-center p-3 hover:border transition-all duration-75 ease-in-out"
                            style={{ backgroundColor: (router.pathname === item.path) ? "#338070" : null }}>
                            <span className="text-5xl">{item.icon}</span>
                            <div className="ml-5 text-3xl">{item.option}</div>
                        </button>
                    </Link>
                ))
            }

        </nav>
    )
}