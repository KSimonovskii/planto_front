import NavItemWithPanel from "./NavItemWithPanel";
import PanelAbout from "./PanelAbout";
import PanelBusiness from "./PanelBusiness";
import PanelHome from "./PanelHome";
import {useTranslation} from "react-i18next";

type FrameWithNavigationPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
};

const FrameWithNavigationPanel = ({
                                      setActivePanel,
                                      onPanelLeave,
                                  }: FrameWithNavigationPanelProps) => {
    const { t } = useTranslation();

    return (


        <nav className="flex flex-row justify-between">
            <NavItemWithPanel
                label={t("nav.about")}
                panel={<PanelAbout onItemClick={()=> {}}/>}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
            />
            <NavItemWithPanel
                label={t("nav.business")}
                panel={<PanelBusiness onItemClick={()=> {}}/>}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
            />
            <NavItemWithPanel
                label={t("nav.home")}
                panel={<PanelHome onItemClick={()=> {}}/>}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
            />
            {/*<NavItemWithPanel*/}
            {/*    label={t("nav.care")}*/}
            {/*    panel={<PanelCare />}*/}
            {/*    setActivePanel={setActivePanel}*/}
            {/*    onPanelLeave={onPanelLeave}*/}
            {/*    isMobile={isMobile}*/}
            {/*    isMobileMenuOpen={isMobileMenuOpen}*/}
            {/*    setMobileMenuOpen={setMobileMenuOpen}*/}
            {/*/>*/}
        </nav>
    );
};

export default FrameWithNavigationPanel;
