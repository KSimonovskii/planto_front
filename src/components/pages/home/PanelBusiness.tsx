import PanelColumn from "./PanelColumn.tsx";
import imageBusiness1 from "../../../assets/imagesHeader/imageForBusinessPlace1.png";
import imageBusiness2 from "../../../assets/imagesHeader/imageForBusinessPlace2.png";
import imageBusiness3 from "../../../assets/imagesHeader/imageForBusinessPlace3.png";

type PanelProps = {
    onItemClick: () => void;
}

const PanelBusiness = ({ onItemClick }: PanelProps) => { // Принимаем пропс
    const hierarchy = "Succulents for business";

    const handleColumnClick = () => {
        onItemClick();
    };

    return (
        <div className="flex flex-row justify-between items-center px-16 gap-10">
            <PanelColumn
                title="Mini gifts"
                img={imageBusiness1}
                hierarchy={hierarchy}
                onClick={handleColumnClick}
            />
            <PanelColumn
                title="Standart Gifts"
                img={imageBusiness2}
                hierarchy={hierarchy}
                onClick={handleColumnClick}
            />
            <PanelColumn
                title="Premium"
                img={imageBusiness3}
                hierarchy={hierarchy}
                onClick={handleColumnClick}
            />
        </div>
    );
};

export default PanelBusiness;
