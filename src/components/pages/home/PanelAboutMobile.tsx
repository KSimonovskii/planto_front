import PanelColumn from "./PanelColumn.tsx";
import imageAbout1 from "../../../assets/imagesHeader/imageAbout3_1.png"
import imageAbout2 from "../../../assets/imagesHeader/imageAbout3_2.png"
import imageAbout3 from "../../../assets/imagesHeader/imageAbout3_3.png"
import {useNavigate} from "react-router-dom";

type PanelProps = {
    onItemClick: () => void;
}

const PanelAboutMobile = ({ onItemClick }: PanelProps) => {
    const navigate = useNavigate();

    const handleClick = (title: string) => {
        onItemClick();

        if (title === "Our Roots") {
            navigate("/our-roots");
        }
        else if (title === "October 7") navigate("/october-7");
        else if (title === "Rebuilding Now") navigate("/rebuilding-now");
    };

    return (
        <div className="flex flex-col gap-3">
            <PanelColumn
                title="Our Roots"
                img={imageAbout1}
                onClick={() => handleClick("Our Roots")}
            />
            <PanelColumn
                title="October 7"
                img={imageAbout2}
                onClick={() => handleClick("October 7")}
            />
            <PanelColumn
                title="Rebuilding Now"
                img={imageAbout3}
                onClick={() => handleClick("Rebuilding Now")}
            />
        </div>
    )
};

export default PanelAboutMobile;
