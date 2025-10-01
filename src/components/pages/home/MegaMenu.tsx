import { useState, useRef, useEffect } from "react";
import TopPanel from "./TopPanel";

const MegaMenu = () => {
    const [activePanel, setActivePanel] = useState<React.ReactNode | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <div className="w-full mx-auto bg-white">
                <TopPanel
                    setActivePanel={handlePanelEnter}
                    onPanelLeave={handlePanelLeave}
                    isMobile={isMobile}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
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
                    <div className="w-full max-w-[1640px] mx-auto bg-white px-4 md:px-28 py-6">
                        {activePanel}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MegaMenu;
