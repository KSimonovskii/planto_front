import PanelColumn from "./PanelColumn.tsx";
import imageBusiness1 from "../../../assets/imagesHeader/imageForBusinessPlace1.png";
import imageBusiness2 from "../../../assets/imagesHeader/imageForBusinessPlace2.png";
import imageBusiness3 from "../../../assets/imagesHeader/imageForBusinessPlace3.png";

const PanelBusiness = () => (
    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-24 w-full">
            <PanelColumn
                title="Mini gifts"
                items={["Eco Wrapping", "Mini Ceramic Pot", "Branded Sleeve"]}
                img={imageBusiness1}
            />
            <PanelColumn
                title="Standart Gifts"
                items={["Single Plants", "Succulent Sets"]}
                img={imageBusiness2}
            />
            <PanelColumn
                title="Premium"
                items={["Terrariums", "Gift Boxes", "Garden Sets"]}
                img={imageBusiness3}
            />
    </div>
);

export default PanelBusiness;