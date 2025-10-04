import NavItemWithPanel from "./NavItemWithPanel";
import PanelAbout from "./PanelAbout";
import PanelBusiness from "./PanelBusiness";
import PanelHome from "./PanelHome";
import PanelCare from "./PanelCare";
import { useTranslation } from "react-i18next";

type FrameWithNavigationPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
    isMobile?: boolean;
    isMobileMenuOpen?: boolean;
    setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FrameWithNavigationPanel = ({
                                      setActivePanel,
                                      onPanelLeave,
                                      isMobile = false,
                                      isMobileMenuOpen,
                                      setMobileMenuOpen
                                  }: FrameWithNavigationPanelProps) => {
    const { t } = useTranslation();

    return (
        <nav className={`flex ${isMobile ? "flex-col gap-4" : "items-center gap-[191px] justify-between"} w-full`}>
            <NavItemWithPanel
                label={t("nav.about")}
                panel={<PanelAbout />}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            <NavItemWithPanel
                label={t("nav.business")}
                panel={<PanelBusiness />}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            <NavItemWithPanel
                label={t("nav.home")}
                panel={<PanelHome />}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            <NavItemWithPanel
                label={t("nav.care")}
                panel={<PanelCare />}
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </nav>
    );
};

export default FrameWithNavigationPanel;
