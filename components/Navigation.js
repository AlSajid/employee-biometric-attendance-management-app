import Link from "next/link";
import menu from "../public/options";
import { useRouter } from "next/router";

export default function Navigation() {
    const router = useRouter()

    return (
        <nav className="w-24 p-3 hover:w-80  ml-3 text-white rounded-xl theme-grad
                        flex flex-col justify-around items-center
                        transition-all duration-300 ease-in-out overflow-hidden"
        >
            {
                menu.map((item, index) => (
                    <Link href={`${item.path}`} key={index} className="w-full">
                        <button type="button" className="w-60 p-3 font-semibold rounded-xl flex items-center hover:bg-teal-700 
                                                        transition-all duration-300 ease-in-out"
                            style={{ backgroundColor: (router.pathname === item.path) ? "#338070" : null }}>
                            <span className="text-5xl mr-3">{item.icon}</span>
                            <div className="text-2xl">{item.option}</div>
                        </button>
                    </Link>
                ))
            }
        </nav>
    )
}