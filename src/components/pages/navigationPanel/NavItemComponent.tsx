import {NavLink} from "react-router-dom";
import type {NavItem} from "../../../utils/types";

const NavItemComponent = ({item}: { item: NavItem }) => {

    return (
        <NavLink
            to={item.path}
            className={({isActive}) =>
                `flex items-center gap-2 uppercase font-rubik text-[16px] cursor-pointer transition-colors
                 ${isActive ? "text-green-800 underline" : "text-[#415A2A] hover:text-green-600"}`
            }
        >
            <span>{item.title}</span>
        </NavLink>
    );
};

export default NavItemComponent;
