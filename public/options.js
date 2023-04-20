import { AiOutlineFieldTime } from "react-icons/ai";
import { MdWifi } from "react-icons/md";
import { VscHome } from "react-icons/vsc";
import { BiCloudDownload} from "react-icons/bi";
import { RiUserStarLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";

const menu =
    [
        { option: "Home", icon: <VscHome />, path: "/" },
        { option: "Connections", icon: <MdWifi />, path: "/devices" },
        { option: "Office Hours", icon: <AiOutlineFieldTime />, path: "/hours" },
        { option: "Add Users", icon: <AiOutlineUserAdd />, path: "/addUser" },
        { option: "Users", icon: <RiUserStarLine />, path: "/users" },
        { option: "Fetch Data", icon: <BiCloudDownload />, path: "/attendance" },
    ]

export default menu;