import React from "react";
import FrameWithLogoMobile from "./FrameWithLogo.mobile";
import TemporaryBannerMobile from "./TemporaryBannerMobile.tsx";

const TopPanelMobile: React.FC<{

    setActivePanel: (panel: React.ReactNode) => void;
    onPanelLeave: () => void;

}> = ({setActivePanel, onPanelLeave}) => {

    return (
        <div>
            <TemporaryBannerMobile/>
            <div className="w-full bg-white">
                <FrameWithLogoMobile setActivePanel={setActivePanel} onPanelLeave={onPanelLeave}/>
            </div>
        </div>
    );
};

export default TopPanelMobile;
