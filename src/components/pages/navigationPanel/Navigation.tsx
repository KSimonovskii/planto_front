import {navItems} from "../../../utils/constants.ts";

import {useCurrentUser} from "../../../features/hooks/useCurrentUser.ts";
import NavItemComponent from "./NavItemComponent.tsx";
import {useMemo} from "react";


const Navigation = () => {

    const {isAdmin} = useCurrentUser();

    const visibleItems = useMemo(() => {
        return navItems.filter(item => {
            if (item.adminOnly && !isAdmin) {
                return false;
            }
            if (item.userOnly && isAdmin) {
                return false;
            }
            return true;
        });
    }, [isAdmin]);

    return (
        <header className="w-full bg-green-50 border-b border-green-200 p-4 fixed top-0 left-0 z-50 shadow">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <nav className="flex space-x-6">
                    {visibleItems.map((item) => (
                        <NavItemComponent key={item.path} item={item}/>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
