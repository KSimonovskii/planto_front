import NavItemWithPanel from "./NavItemWithPanel";
import PanelAbout from "./PanelAbout";
import PanelBusiness from "./PanelBusiness";
import PanelHome from "./PanelHome";
import PanelCare from "./PanelCare";

type FrameWithNavigationPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
};

const FrameWithNavigationPanel = ({ setActivePanel, onPanelLeave }: FrameWithNavigationPanelProps) => {
    return (
        <nav className="flex items-center gap-[191px] self-stretch">
            <NavItemWithPanel label="About Us" panel={<PanelAbout />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
            <NavItemWithPanel label="Succulents for business" panel={<PanelBusiness />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
            <NavItemWithPanel label="Succulents for home" panel={<PanelHome />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
            <NavItemWithPanel label="Care instructions" panel={<PanelCare />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
        </nav>
    );
};

export default FrameWithNavigationPanel;
