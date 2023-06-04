import { AiOutlineSetting } from "react-icons/ai";
import { MdWifi } from "react-icons/md";
import { VscHome } from "react-icons/vsc";
import { BiCloudDownload } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendarTimes } from "react-icons/fa";
import {HiOutlineDocumentReport} from "react-icons/hi";

const menu = [
  {
    option: "Home",
    icon: <VscHome />,
    sub: [
      {
        name: "Dashboard",
        path: "/",
      },
    ],
  },
  {
    option: "Devices",
    icon: <MdWifi />,
    sub: [
      {
        name: "Connections",
        path: "/devices/connections",
      },
    ],
  },
  {
    option: "Users",
    icon: <FiUsers />,
    sub: [
      {
        name: "Add User",
        path: "/users/add-user",
      },
      {
        name: "Manage Users",
        path: "/users/manage-users",
      },
    ],
  },
  {
    option: "Leave",
    icon: <FaRegCalendarTimes />,
    sub: [
      {
        name: "Apply Leave",
        path: "/leave/apply-leave",
      },
      {
        name: "Manage Leaves",
        path: "/leave/manage-leaves",
      },
      {
        name: "Leave Types",
        path: "/settings/leave-types",
      },
    ],
  },
  {
    option: "Pull Data",
    icon: <BiCloudDownload />,
    sub: [
      {
        name: "Fetch Attendance",
        path: "/attendance/puller",
      },
    ],
  },
  {
    option: "Settings",
    icon: <AiOutlineSetting />,
    sub: [
      {
        name: "Company",
        path: "/settings/company",
      },
      {
        name: "Office Hours",
        path: "/settings/hours",
      },
    ],
  },
  {
    option: "Reports",
    icon: <HiOutlineDocumentReport />,
    sub: [
      {
        name: "Attendance",
        path: "/reports/attendance",
      },
    ],
  },
];

export default menu;
