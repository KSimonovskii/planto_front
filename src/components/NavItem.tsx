import type {Item} from "../utils/types";
import {Link} from "react-router";


interface Props {
    item: Item
}

const NavItem = (props: Props) => {
    return (
        <li className={"my-3 hover:bg-[#cd663d] hover:rounded-md"}>
            <Link to={`${props.item.path}`} className={"text-[#9dbfab] font-bold"}>
                {props.item.title}
            </Link>
        </li>
    )
}

export default NavItem