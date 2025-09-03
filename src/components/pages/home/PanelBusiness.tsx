import PanelColumn from "./PanelColumn.tsx";
import imageBusiness1 from "../../../assets/imageForBusinessPlace1.jpg";
import imageBusiness2 from "../../../assets/imageForBusinessPlace2.jpg";
import imageBusiness3 from "../../../assets/imageForBusinessPlace3.png";

const PanelBusiness = () => (
    <div className="self-stretch flex justify-start items-start gap-24">
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