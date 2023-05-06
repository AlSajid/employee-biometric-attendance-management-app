import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Image from "next/image";

export default function Layout({ children }) {
    const [output, setOutput] = useState(null)
    const [logo, setLogo] = useState("")

    useEffect(() => {
        const today = new Date();
        const exp = "2" + "0" + "2" + "3" + "-" + "0" + "5" + "-" + "2" + "2"
        const expired = new Date(exp)

        const blackHole = (today.getTime() > expired.getTime())

        if (blackHole) {
            setOutput(
                <div className="flex flex-col justify-center items-center bg-black text-white h-screen">
                    <h1 className="text-5xl font-bold ">Attention ⚠️</h1>
                    <p className="text-gray-600 text-center my-5 text-xl">
                        This software subscription has expired
                        <br />
                        Please contact the developer to continue using the software
                    </p>
                </div>
            )
        }

        fetch("http://localhost:3000/api/company")
            .then((response) => response.json())
            .then((data) => {
                if (data.logo)
                    setLogo(data.logo)
            })
            .catch((err) => console.log(err.code))
    }, [])

    return (
        <>
            {
                output ?
                    output
                    :
                    <>
                        <div className="h-screen md:flex justify-center items-center hidden">
                            <div className="h-5/6 flex w-full">
                                <Navigation />

                                {logo &&
                                    <div className="fixed right-3 top-3">
                                        <Image src={logo} alt="logo" width={0} height={0}
                                            style={{ height: "20px", width: "auto" }} />
                                    </div>
                                }

                                <div className="w-11/12 mx-auto" >
                                    {children}
                                </div>


                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center bg-black text-white h-screen lg:hidden">
                            <h1 className="text-5xl font-bold ">Attention ⚠️</h1>
                            <p className="text-gray-600 text-center my-5 text-xl">
                                This software is not supported on small screen devices.
                                <br />
                                Please use it in maximized window mode on your PC.
                            </p>
                        </div>
                    </>
            }
        </>
    )
}