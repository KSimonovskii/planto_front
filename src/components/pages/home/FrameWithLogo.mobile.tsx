import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import MobileNavMenu from "./MobileNavMenu";
import FrameWithCartIconMobile from "./FrameWithCartIconMobile.tsx";

const FrameWithLogoMobile: React.FC<{
    setActivePanel: (panel: ReactNode) => void;
    onPanelLeave: () => void;
}> = ({ setActivePanel, onPanelLeave }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const handlerClickLogo = () => {
        navigate("/");
    };

    return (
        <div className="relative w-full bg-white my-3">
            <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen((s) => !s)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-300"
                    >
                        <svg
                            className="w-6 h-6 text-lime-900"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path
                                    d="M6 6L18 18M6 18L18 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ) : (
                                <path
                                    d="M3 6H21M3 12H21M3 18H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            )}
                        </svg>
                    </button>

                    <button
                        onClick={handlerClickLogo}
                        className="duration-200 hover:scale-105 active:scale-95 flex items-center"
                    >
                        <Logo className="scale-70"/>
                    </button>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                    <FrameWithCartIconMobile />
                </div>
            </div>

            {menuOpen && (
                <>
                    <div
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 bg-black/30 z-40 overflow-y-auto"
                        aria-hidden="true"
                    />
                    <div className="relative z-50">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="transform transition ease-out duration-200 translate-y-0 opacity-100">
                                <MobileNavMenu
                                    onClose={() => setMenuOpen(false)}
                                    setActivePanel={setActivePanel}
                                    onPanelLeave={onPanelLeave}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FrameWithLogoMobile;
