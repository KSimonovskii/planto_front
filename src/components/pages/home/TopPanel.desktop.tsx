import FrameWithLogo from "./FrameWithLogo";
import FrameWithNavigationPanel from "./FrameWithNavigationPanel";

type TopPanelDesktopProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
};

const TopPanelDesktop = ({
                             setActivePanel,
                             onPanelLeave,
                         }: TopPanelDesktopProps) => {
    return (

        <div className="mx-16 my-6">
            <FrameWithLogo/>
            <FrameWithNavigationPanel
                setActivePanel={setActivePanel}
                onPanelLeave={onPanelLeave}
            />
        </div>
    )
        ;
};

export default TopPanelDesktop;
