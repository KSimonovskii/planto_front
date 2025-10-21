import React from "react";
import FrameWithLogoMobile from "./FrameWithLogo.mobile";

const TopPanelMobile: React.FC<{

    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;

}> = ({ setActivePanel, onPanelLeave }) => {

    return (
        <div className="w-full bg-white">
            <FrameWithLogoMobile setActivePanel={setActivePanel} onPanelLeave={onPanelLeave} />
        </div>
    );
};

export default TopPanelMobile;
