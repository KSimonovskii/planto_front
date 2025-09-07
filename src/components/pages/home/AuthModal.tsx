import React from "react";
import {useNavigate} from "react-router-dom"; // <--- исправлено
import {useTranslation} from "react-i18next";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({isOpen, onClose}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        navigate("/accountDashboard");
    };

    const handleHome = () => {
        onClose();
        navigate("/");
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-lime-800 mb-4">{t("authModal.title")}</h2>
                <p className="mb-6 text-lime-800">{t("authModal.message")}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition"
                    >
                        {t("authModal.login")}
                    </button>
                    <button
                        onClick={handleHome}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        {t("authModal.home")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
