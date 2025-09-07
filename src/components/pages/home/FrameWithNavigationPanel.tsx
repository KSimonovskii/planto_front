import NavItemWithPanel from "./NavItemWithPanel";
import PanelAbout from "./PanelAbout";
import PanelBusiness from "./PanelBusiness";
import PanelHome from "./PanelHome";
import PanelCare from "./PanelCare";
import {useTranslation} from "react-i18next";

type FrameWithNavigationPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
};

const FrameWithNavigationPanel = ({ setActivePanel, onPanelLeave }: FrameWithNavigationPanelProps) => {

    const {t} = useTranslation();

    return (
        <nav className="flex items-center gap-[191px] self-stretch">
            <NavItemWithPanel label={t("nav.about")} panel={<PanelAbout />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
            <NavItemWithPanel label={t("nav.business")} panel={<PanelBusiness />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
            <NavItemWithPanel label={t("nav.home")} panel={<PanelHome />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
            <NavItemWithPanel label={t("nav.care")} panel={<PanelCare />} setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
        </nav>
    );
};

export default FrameWithNavigationPanel;
