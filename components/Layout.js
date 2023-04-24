import { useEffect, useState } from "react";
import Navigation from "./Navigation";

export default function Layout({ children }) {
    const [output, setOutput] = useState(null)

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
    }, [])

    return (
        <>
            {
                output ?
                    output
                    :
                    <div className="h-screen flex justify-center items-center ">
                        <div className="h-5/6 flex w-full">
                            <Navigation />

                            <div className="w-10/12 mx-auto" >
                                {children}
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}