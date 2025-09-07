type NavItemWithPanelProps = {
    label: string;
    panel: React.ReactNode;
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
};

const NavItemWithPanel = ({ label, panel, setActivePanel, onPanelLeave }: NavItemWithPanelProps) => {
    const navItemClasses =
        "text-green-800 text-center font-normal uppercase text-base leading-normal cursor-pointer hover:text-lime-900 transition";

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setActivePanel(panel)}
            onMouseLeave={onPanelLeave}
        >
            <div className={navItemClasses}>{label}</div>
        </div>
    );
};

export default NavItemWithPanel;
