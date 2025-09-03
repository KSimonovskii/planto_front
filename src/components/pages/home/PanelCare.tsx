import PanelColumn from "./PanelColumn.tsx";
import image from "../../../assets/1.jpg";

const PanelCare = () => (
    <div className="self-stretch flex justify-start items-start gap-24">
        <PanelColumn
            title="Watering"
            items={["How Often", "Signs of Overwatering"]}
            img={image}
        />

    </div>
);

export default PanelCare;