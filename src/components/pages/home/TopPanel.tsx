import FrameWithLogo from "./FrameWithLogo";
import FrameWithNavigationPanel from "./FrameWithNavigationPanel";

type TopPanelProps = {
    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;
};

const TopPanel = ({ setActivePanel, onPanelLeave }: TopPanelProps) => {
    return (
        <div className="flex flex-col w-full max-w-[1218px] mx-auto gap-10 px-4">
            <FrameWithLogo />
            <FrameWithNavigationPanel setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
        </div>
    );
};

export default TopPanel;
