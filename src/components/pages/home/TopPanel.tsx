import FrameWithLogo from "./FrameWithLogo";
import FrameWithNavigationPanel from "./FrameWithNavigationPanel";

type TopPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
    isMobile: boolean;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopPanel = ({
                      setActivePanel,
                      onPanelLeave,
                      isMobile,
                      isMobileMenuOpen,
                      setMobileMenuOpen
                  }: TopPanelProps) => {
    return (
        <div className="flex flex-col w-full max-w-[1218px] mx-auto gap-4 px-4 md:px-0">
            <FrameWithLogo />
            <FrameWithNavigationPanel
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
                isMobile={isMobile}
                isMobileMenuOpen={isMobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </div>
    );
};

export default TopPanel;
