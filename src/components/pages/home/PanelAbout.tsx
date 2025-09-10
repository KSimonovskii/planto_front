import PanelColumn from "./PanelColumn.tsx";
import imageAbout1 from "../../../assets/imagesHeader/imageAbout3_1.png"
import imageAbout2 from "../../../assets/imagesHeader/imageAbout3_2.png"
import imageAbout3 from "../../../assets/imagesHeader/imageAbout3_3.png"

const PanelAbout = () => (

    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-24 w-full">
            <PanelColumn
                title="Our Roots"
                img={imageAbout1}
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
);

export default PanelAbout;