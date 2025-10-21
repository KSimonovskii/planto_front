import {useEffect, useRef, useState} from "react";
import TopPanel from "./TopPanel";
import {useIsMobile} from "../../../features/hooks/useIsMobile.ts";

const MegaMenu = () => {
    const [activePanel, setActivePanel] = useState<React.ReactNode | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isMobile = useIsMobile(768);

    const handlePanelEnter = (panel: React.ReactNode) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActivePanel(panel);
        setIsVisible(true);
    };

    const handlePanelLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            timeoutRef.current = setTimeout(() => setActivePanel(null), 300);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

       return (
        <div className="w-full bg-white">
            <TopPanel
                setActivePanel={handlePanelEnter}
                onPanelLeave={handlePanelLeave}
                isMobile={isMobile}
            />


            {activePanel && (
                <div
                    className={`absolute top-full left-0 right-0 z-10 transition-all duration-300
            ${isVisible ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"}`}
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setIsVisible(true);
                    }}
                    onMouseLeave={handlePanelLeave}
                >
                    <div className="bg-white">
                        {activePanel}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MegaMenu;
