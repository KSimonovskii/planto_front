import PanelColumn from "./PanelColumn.tsx";
import imageBusiness1 from "../../../assets/imagesHeader/imageForBusinessPlace1.png";
import imageBusiness2 from "../../../assets/imagesHeader/imageForBusinessPlace2.png";
import imageBusiness3 from "../../../assets/imagesHeader/imageForBusinessPlace3.png";

const PanelBusiness = () => {
    const hierarchy = "Succulents for business";

    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-24 w-full">
            <PanelColumn title="Mini gifts" img={imageBusiness1} hierarchy={hierarchy} />
            <PanelColumn title="Standart Gifts" img={imageBusiness2} hierarchy={hierarchy} />
            <PanelColumn title="Premium" img={imageBusiness3} hierarchy={hierarchy} />
        </div>
    );
};

export default PanelBusiness;
