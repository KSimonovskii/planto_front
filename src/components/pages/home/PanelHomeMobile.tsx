import PanelColumn from "./PanelColumn.tsx";
import imageHome1 from "../../../assets/imagesHeader/imageForHomePlace1.png";
import imageHome2 from "../../../assets/imagesHeader/imageForHomePlace2.png";
import imageHome3 from "../../../assets/imagesHeader/imageForHomePlace3.png";

type PanelProps = {
    onItemClick: () => void;
}

const PanelHomeMobile = ({ onItemClick }: PanelProps) => {
    const hierarchy = "Succulents for home";

    const handleColumnClick = () => {
        onItemClick();
    };

    return (
        <div className="flex flex-col gap-3">
            <PanelColumn
                title="Indoor Succulents"
                img={imageHome1}
                hierarchy={hierarchy}
                onClick={handleColumnClick}
            />
            <PanelColumn
                title="Outdoor Succulents"
                img={imageHome2}
                hierarchy={hierarchy}
                onClick={handleColumnClick}
            />
            <PanelColumn
                title="Sets for you home"
                img={imageHome3}
                hierarchy={hierarchy}
                onClick={handleColumnClick}
            />
        </div>
    );
};

export default PanelHomeMobile;
