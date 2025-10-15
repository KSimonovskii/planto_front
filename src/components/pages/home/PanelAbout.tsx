import PanelColumn from "./PanelColumn.tsx";
import imageAbout1 from "../../../assets/imagesHeader/imageAbout3_1.png"
import imageAbout2 from "../../../assets/imagesHeader/imageAbout3_2.png"
import imageAbout3 from "../../../assets/imagesHeader/imageAbout3_3.png"
import {useNavigate} from "react-router-dom";

const PanelAbout = () => {
        const navigate = useNavigate();

        const handleClick = (title: string) => {
                if (title === "Our Roots") {
                        navigate("/our-roots");
                }

                // else if (title === "October 7") navigate("/october-7");
                // else if (title === "Rebuilding Now") navigate("/rebuilding-now");
        };

    return (
        <div className="flex flex-row justify-between">
            <PanelColumn
                title="Our Roots"
                img={imageAbout1}
                onClick={() => handleClick("Our Roots")}
            />
            <PanelColumn
                title="October 7"
                img={imageAbout2}
            />
            <PanelColumn
                title="Rebuilding Now"
                img={imageAbout3}
            />
        </div>
    )
};

export default PanelAbout;