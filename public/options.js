import { AiOutlineFieldTime, AiOutlineUserAdd, AiOutlineSetting } from "react-icons/ai";
import { MdWifi } from "react-icons/md";
import { VscHome } from "react-icons/vsc";
import { BiCloudDownload } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendarTimes } from "react-icons/fa";


const menu =
    [
        // {
        //     option: "Home", icon: <VscHome />,
        //     sub: [
        //         {
        //             name: "Dashboard",
        //             path: "/"
        //         }
        //     ]
        // },
        {
            option: "Devices", icon: <MdWifi />,
            sub: [
                {
                    name: "Connections",
                    path: "/devices/connections"
                }
            ]
        },
        {
            option: "Leave", icon: <FaRegCalendarTimes />, sub: [
                {
                    name: "Apply Leave",
                    path: "/leave/apply-leave"
                },
                {
                    name: "Manage Leaves",
                    path: "/leave/apply-leave"
                },
            ]
        },
        {
            option: "User", icon: <FiUsers />, sub: [
                {
                    name: "Add User",
                    path: "/users/add-user"
                },
                {
                    name: "Manage Users",
                    path: "/users/users"
                }
            ]
        },
        // { option: "Pull Data", icon: <BiCloudDownload />, path: "/attendance" },
        {
            option: "Settings", icon: <AiOutlineSetting />, sub: [
                {
                    name: "Company",
                    path: "/settings/company"
                },
                {
                    name: "Office Hours",
                    path: "/settings/hours"
                },
                {
                    name: "Office Hours",
                    path: "/settings/hours"
                },
                {
                    name: "Office Hours",
                    path: "/settings/hours"
                },
                {
                    name: "Office Hours",
                    path: "/settings/hours"
                },
                {
                    name: "Office Hours",
                    path: "/settings/hours"
                },
                {
                    name: "Office Hours",
                    path: "/settings/hours"
                },
            ]
        }
    ]

export default menu;