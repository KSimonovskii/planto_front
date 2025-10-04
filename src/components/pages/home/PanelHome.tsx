import PanelColumn from "./PanelColumn.tsx";
import imageHome1 from "../../../assets/imagesHeader/imageForHomePlace1.png";
import imageHome2 from "../../../assets/imagesHeader/imageForHomePlace2.png";
import imageHome3 from "../../../assets/imagesHeader/imageForHomePlace3.png";

const PanelHome = () => {
    const hierarchy = "Succulents for home";

    return (
        <div className="flex flex-row justify-between">
            <PanelColumn title="Indoor Succulents" img={imageHome1} hierarchy={hierarchy} />
            <PanelColumn title="Outdoor Succulents" img={imageHome2} hierarchy={hierarchy} />
            <PanelColumn title="Sets for you home" img={imageHome3} hierarchy={hierarchy} />
        </div>
    );
};

export default PanelHome;
