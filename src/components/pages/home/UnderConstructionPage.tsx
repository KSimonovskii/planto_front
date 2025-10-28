import { useNavigate } from "react-router";

const UnderConstructionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-lime-50 px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-lime-900 mb-6 font-['Rubik']">
                This page is currently under development
            </h1>
            <p className="text-lg sm:text-xl text-lime-800 mb-8 font-['Rubik']">
                We are working hard to bring you new content. Please check back later.
            </p>
            <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-lime-900 text-white rounded-lg text-base sm:text-lg font-medium hover:bg-lime-700 transition font-['Rubik']"
            >
                Go Back
            </button>
        </div>
    );
};

export default UnderConstructionPage;
