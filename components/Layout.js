import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import logo from '../public/logo.svg';

export default function Layout({ children }) {
    const [output, setOutput] = useState(null);

    useEffect(() => {
        const exp = "2" + "0" + "2" + "3" + "-" + "0" + "9" + "-" + "2" + "6"
        const today = new Date();
        const expired = new Date(exp)

        const blackHole = (today.getTime() > expired.getTime())

        fetch("http://localhost:7777/api/company")
        .then((response) => response.json())
        .then((data) => {
            if (blackHole || !data.subscription) {

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
                return;
            } 
            setOutput(null)

            if (data.name)
                localStorage.setItem("company", data.name)

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
                        <div className="h-screen lg:flex justify-center items-center hidden bg-slate-50">
                            <div>
                                <Navigation logo={logo} />
                            </div>

                            <div className="w-full mx-auto h-full" >
                                {children}
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