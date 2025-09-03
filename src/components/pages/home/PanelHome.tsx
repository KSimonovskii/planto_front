import PanelColumn from "./PanelColumn.tsx";
import imageHome1 from "../../../assets/imageForHomePlace1.jpg";
import imageHome2 from "../../../assets/imageForHomePlace2.jpg";
import imageHome3 from "../../../assets/imageForHomePlace3.jpg";


const PanelHome = () => (
    <div className="self-stretch flex justify-start items-start gap-24">
        <PanelColumn
            title="Indoor Succulents"
            items={[]}
            img={imageHome1}
        />
        <PanelColumn
            title="Outdoor Succulents"
            items={[]}
            img={imageHome2}
        />
        <PanelColumn
            title="Sets for you home"
            items={[]}
            img={imageHome3}
        />
    </div>
);

export default PanelHome;