import TopPanelMobile from "./TopPanel.mobile.tsx";
import TopPanelDesktop from "./TopPanel.desktop.tsx";

type TopPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
    isMobile: boolean;
};

const TopPanel = ({
                      setActivePanel,
                      onPanelLeave,
                      isMobile,
                  }: TopPanelProps) => {
    return isMobile ? (
        <TopPanelMobile setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
    ) : (
        <TopPanelDesktop setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
    );
};

export default TopPanel;
