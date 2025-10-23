import arrowLeft from "../../../assets/arrow-left.svg"
import arrowRight from "../../../assets/arrow-right.svg"
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";


type Props = {
    onPrev: () => void;
    onNext: () => void;
}

const FramePaginationCorporateFavorites = ({onPrev, onNext}: Props) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleClickViewAll = () => {
        navigate("/store");
    }

    return (
        <div className="w-full flex justify-center items-center gap-10 pt-6">


            <div className="relative w-full">
                <button
                    onClick={onPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2
                   w-12 h-12 flex justify-center items-center
                   bg-white rounded-full shadow
                   hover:bg-gray-100 transition"
                >
                    <img src={arrowLeft} alt="Previous" className="w-6 h-6"/>
                </button>
            </div>

            <button
                onClick={handleClickViewAll}
                className="w-110 px-6 py-3 bg-lime-600 rounded-lg text-white font-medium hover:bg-lime-700 transition">
                {t("viewAll")}
            </button>

            <div className="relative w-full">
                <button
                    onClick={onNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2
                   w-12 h-12 flex justify-center items-center
                   bg-white rounded-full shadow
                   hover:bg-gray-100 transition">
                    <img src={arrowRight} alt="Next" className="w-6 h-6"/>
                </button>
            </div>
        </div>
    );
};

export default FramePaginationCorporateFavorites;
