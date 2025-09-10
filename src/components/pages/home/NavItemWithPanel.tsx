import type { ReactNode, Dispatch, SetStateAction } from "react";

type NavItemWithPanelProps = {
    label: string;
    panel: ReactNode;
    setActivePanel: (panel: ReactNode) => void;
    onPanelLeave: () => void;
    isMobile?: boolean;
    isMobileMenuOpen?: boolean;
    setMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
};

const NavItemWithPanel = ({
                              label,
                              panel,
                              setActivePanel,
                              onPanelLeave,
                              isMobile = false,
                              isMobileMenuOpen,
                              setMobileMenuOpen
                          }: NavItemWithPanelProps) => {

    const navItemClasses =
        "text-green-800 text-center font-normal uppercase text-base leading-normal cursor-pointer hover:text-lime-900 transition";

    const handleClick = () => {
        if (isMobile && setMobileMenuOpen) {
            setMobileMenuOpen(!isMobileMenuOpen);
            setActivePanel(panel);
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => !isMobile && setActivePanel(panel)}
            onMouseLeave={() => !isMobile && onPanelLeave()}
            onClick={handleClick}
        >
            <div className={navItemClasses}>{label}</div>
        </div>
    );
};

export default NavItemWithPanel;
