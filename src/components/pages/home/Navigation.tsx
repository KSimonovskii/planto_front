import {navItems} from "../../../utils/constants.ts";
import NavItem from "./NavItem.tsx";

const Navigation = () => {
    return (
        <header className="w-full bg-green-50 border-b border-green-200 p-4 fixed top-0 left-0 z-50 shadow">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <nav className="flex space-x-6">
                    {navItems.map((item) => (
                        <NavItem key={item.path} item={item}/>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
