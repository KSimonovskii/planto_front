import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const SubscribeMobile = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
    const isActive = isValidEmail(email);

    const handleSubmit = () => {
        if (!isActive) {
            if (!isValidEmail(email)) {
                setError("Invalid email");
            }
            return;
        }

        setEmail("");
        setError("");
        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="bg-lime-900 rounded-xl p-6 mx-4 my-4 flex flex-col gap-4">
            <p className="text-white text-3xl font-bold font-['Rubik'] text-left">
                Get updates on new collections, impact stories, and more
            </p>

            <div className="flex flex-col gap-2 relative">
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full h-12 pl-10 pr-4 bg-neutral-50 rounded-lg outline outline-1 outline-lime-900 text-base sm:text-lg font-['Rubik'] placeholder-stone-400"
                    />
                </div>
                {error && <span className="text-red-400 text-sm">{error}</span>}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!isActive}
                className={`w-full px-6 py-3 rounded-lg transition font-['Rubik'] text-base text-left ${
                    isActive
                        ? "bg-lime-600 text-white hover:bg-lime-700"
                        : "bg-white text-black cursor-not-allowed"
                }`}
            >
                {submitted ? "Subscribed" : "Subscribe to Newsletter"}
            </button>
        </div>
    );
};

export default SubscribeMobile;
