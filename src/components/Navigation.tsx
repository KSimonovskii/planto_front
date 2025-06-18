import {navItems} from "../utils/constants.ts";
import NavItem from "./NavItem.tsx";

const Navigation = () => {
    return (
        <nav className={"col-span-1 bg-[#405443] h-full py-10 px-3"}>
            <ul>
                {navItems.map(item => <NavItem key={item.path} item={item} />)}
            </ul>
        </nav>
    )
}
export default Navigation