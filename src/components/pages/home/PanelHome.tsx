import PanelColumn from "./PanelColumn.tsx";
import imageHome1 from "../../../assets/imagesHeader/imageForHomePlace1.png";
import imageHome2 from "../../../assets/imagesHeader/imageForHomePlace2.png";
import imageHome3 from "../../../assets/imagesHeader/imageForHomePlace3.png";


const PanelHome = () => (
    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-24 w-full">
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