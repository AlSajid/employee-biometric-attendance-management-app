import {
  AiOutlineFieldTime,
  AiOutlineUserAdd,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdWifi } from "react-icons/md";
import { VscHome } from "react-icons/vsc";
import { BiCloudDownload } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendarTimes } from "react-icons/fa";

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
        name: "Earned Leaves",
        path: "/leave/earned-leaves",
      },
    ],
  },
  {
    option: "User",
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
      {
        name: "Leave Types",
        path: "/settings/leave-types",
      },
    ],
  },
];

export default menu;
