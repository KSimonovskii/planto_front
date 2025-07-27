import { NavLink } from "react-router-dom";
import type { NavItem } from "../../../utils/types";

interface Props {
    item: NavItem;
}

const NavItemComponent = ({ item }: Props) => {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                    isActive
                        ? "text-green-800 underline"
                        : "text-gray-600 hover:text-green-600"
                }`
            }
        >
            <Icon className="w-5 h-5" />
            <span>{item.title}</span>
        </NavLink>
    );
};

export default NavItemComponent;
