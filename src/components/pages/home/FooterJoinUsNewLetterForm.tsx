import {useState} from "react";
import {useTranslation} from "react-i18next";

const FooterJoinUsNewLetterForm = () => {
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const {t} = useTranslation();


    const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
    const isActive = isValidEmail(email) && checked;

    const handleSubmit = () => {
        if (!isActive) {
            if (!isValidEmail(email)) {
                setError("Invalid email");
            }
            return;
        }

        setError("");
        setSubmitted(true);


        setEmail("");
        setChecked(false);


        setTimeout(() => {
            setSubmitted(false);
        }, 3000);

        // todo: request to server
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="w-60 text-white text-base font-normal font-['Rubik'] leading-normal">
                {t("footer.getUpdate")}
            </div>

            <div className="flex flex-col gap-1">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.email")}
                    className="w-72 h-10 px-4 bg-neutral-50 rounded-lg outline outline-1 outline-lime-800 text-base font-['Rubik'] placeholder-stone-400"
                />
                {error && <span className="text-red-400 text-sm">{error}</span>}
            </div>

            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-400"
                />
                <div className="w-60 text-white text-xs font-normal font-['Lato'] leading-tight">
                    {t("footer.agree")}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!isActive}
                className={`px-6 py-3 rounded-lg inline-flex justify-center items-center gap-2 transition ${
                    isActive
                        ? "bg-lime-600 text-white hover:bg-lime-700"
                        : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
                {submitted ? t("footer.sent") : t("footer.sending")}
            </button>
        </div>
    );
};

export default FooterJoinUsNewLetterForm;
