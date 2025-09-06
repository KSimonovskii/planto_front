import type {NavItem} from "../../../utils/types";
import {NavLink, useNavigate} from "react-router";
import {useContext} from "react";
import {PageProductContext} from "../../../utils/context.ts";

interface Props {
    item: NavItem
}

const NavItem = (props: Props) => {

    const {pageNumber} = useContext(PageProductContext);
    const navigate = useNavigate();

    const activeStyle = "bg-alt-text text-base-bg rounded-md";
    const defaultStyle = "text-light-green";

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

        if (props.item.path === "products") {
            e.preventDefault();
            navigate(`/${props.item.path}/${props.item.path == "products"? (pageNumber || 1) : ""}`);
        }
    }

    return (
        <li>
            <NavLink to={`${props.item.path}`} end={false}
                     className={({isActive}) =>
                    (`flex items-center my-3 w-full h-10 ${isActive? activeStyle : defaultStyle} font-bold hover:bg-alt-text hover:text-base-bg hover:rounded-md`)}
            onClick={handleNavClick}>
                <props.item.icon/> <span>{props.item.title}</span>
            </NavLink>
        </li>
    )
}

export default NavItem