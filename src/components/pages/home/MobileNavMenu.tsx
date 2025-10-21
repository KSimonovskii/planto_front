import type {ReactNode} from "react";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import PanelAboutMobile from "./PanelAboutMobile.tsx";
import PanelHomeMobile from "./PanelHomeMobile.tsx";
import PanelBusinessMobile from "./PanelBusinessMobile.tsx";

type MobileNavMenuProps = {
    onClose: () => void;
    setActivePanel: (panel: ReactNode) => void;
    onPanelLeave?: () => void;
};

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({onClose, onPanelLeave}) => {
    const {t} = useTranslation();
    const ref = useRef<HTMLDivElement | null>(null);
    const [openSubPanel, setOpenSubPanel] = useState<"about" | "business" | "home" | null>(null);


    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [onClose]);

    const handleInnerItemClick = () => {
        onClose();
        onPanelLeave?.();
    };

    const togglePanel = (panelName: "about" | "business" | "home") => {
        const willOpen = openSubPanel === panelName ? null : panelName;
        setOpenSubPanel(willOpen);

        if (!willOpen) {
            onPanelLeave?.();
        }
    };

    return (
        <>

            <div className="fixed inset-0 z-40">
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-white/30 backdrop-blur-md"
                    aria-hidden="true"
                />
            </div>

            <div
                ref={ref}
                className="absolute left-0 top-full w-full bg-white shadow-md z-50 transform transition ease-out duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col gap-2">

                    <button
                        onClick={() => togglePanel("about")}
                        className="flex items-center justify-between text-lime-800 text-base w-full px-3 py-3 rounded hover:bg-lime-50"
                        aria-expanded={openSubPanel === "about"}
                    >
                        <span>{t("nav.about")}</span>
                        <span className="ml-2 text-sm text-lime-800">
            {openSubPanel === "about" ? "▲" : "▼"}
        </span>
                    </button>

                    {openSubPanel === "about" && (
                        <div className="mt-2 bg-white border-t border-lime-800/10 pt-3">
                            <div className="px-1">
                                <PanelAboutMobile onItemClick={handleInnerItemClick}/>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => togglePanel("business")}
                        className="flex items-center justify-between text-lime-800 text-base w-full px-3 py-3 rounded hover:bg-lime-50"
                        aria-expanded={openSubPanel === "business"}
                    >
                        <span>{t("nav.business")}</span>
                        <span className="ml-2 text-sm text-lime-800">
            {openSubPanel === "business" ? "▲" : "▼"}
        </span>
                    </button>

                    {openSubPanel === "business" && (
                        <div className="mt-2 bg-white border-t border-lime-800/10 pt-3">
                            <div className="px-1">
                                <PanelBusinessMobile onItemClick={handleInnerItemClick}/>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => togglePanel("home")}
                        className="flex items-center justify-between text-lime-800 text-base w-full px-3 py-3 rounded hover:bg-lime-50"
                        aria-expanded={openSubPanel === "home"}
                    >
                        <span>{t("nav.home")}</span>
                        <span className="ml-2 text-sm text-lime-800">
            {openSubPanel === "home" ? "▲" : "▼"}
        </span>
                    </button>

                    {openSubPanel === "home" && (
                        <div className="mt-2 bg-white border-t border-lime-800/10 pt-3">
                            <div className="px-1">
                                <PanelHomeMobile onItemClick={handleInnerItemClick}/>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default MobileNavMenu;
