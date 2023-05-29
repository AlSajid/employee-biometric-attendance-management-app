import Link from "next/link";
import menu from "../public/options";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navigation({ logo }) {
  const router = useRouter();

  return (
    <nav className="w-64 h-screen text-white flex flex-col ">
      <div className="p-3 flex justify-center items-center h-16">
        {logo && (
          <Image
            src={logo}
            alt="logo"
            width={0}
            height={0}
            style={{ height: "auto", width: "" }}
          />
        )}
      </div>

      <div className="theme-grad h-full rounded-tr-lg">
        {menu.map((item, index) => (
          <div
            key={index}
            className="h-16 hover:h-60 overflow-hidden transition-all duration-300 ease-out p-3"
          >
            <button
              type="button"
              className="w-56 h-12 p-3 font-semibold rounded-lg flex items-center
                        hover:bg-teal-900 bg-teal-700
                        transition-all duration-300 ease-in-out "
              style={{
                backgroundColor:
                  router.pathname === item.path ? "#338070" : null,
              }}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="text-xl">{item.option}</span>
            </button>

            <div className="overflow-y-scroll h-44 bg-teal-500 ">
              {item?.sub?.map((options, index) => (
                <Link
                  key={index}
                  href={`${options.path}`}
                  className=" bg-green-50 overflow-y-scroll"
                >
                  <button
                    type="button"
                    className={
                      (router.pathname === options.path
                        ? " bg-teal-900"
                        : "bg-teal-600 ") +
                      " hover:bg-teal-700 w-52 p-3 font-semibold rounded flex items-center transition-all duration-300 ease-in-out"
                    }
                  >
                    <div className="text-lg font-thin">{options.name}</div>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
