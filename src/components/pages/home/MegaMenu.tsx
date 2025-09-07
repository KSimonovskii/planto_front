import { useState, useRef } from "react";
import TopPanel from "./TopPanel";

const MegaMenu = () => {
    const [activePanel, setActivePanel] = useState<React.ReactNode | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    return (
        <div className="w-[1440px] h-48 bg-white inline-flex flex-col justify-start items-center gap-10 py-10 px-4 sm:px-6 relative sticky top-0 z-50">
            <TopPanel setActivePanel={handlePanelEnter} onPanelLeave={handlePanelLeave} />

                     {activePanel && (
                <div
                    className={`absolute top-full left-0 right-0 bg-white shadow-lg z-10 px-28 py-10 overflow-hidden transition-all duration-300 ${
                        isVisible ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
                    }`}
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setIsVisible(true);
                    }}
                    onMouseLeave={handlePanelLeave}
                >
                    {activePanel}
                </div>
            )}
        </div>
    );
};

export default MegaMenu;
