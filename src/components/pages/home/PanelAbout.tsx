import PanelColumn from "./PanelColumn.tsx";
import imageAbout1 from "../../../assets/imagesHeader/imageAboutPlace1.jpg"
import imageAbout2 from "../../../assets/imagesHeader/imageAboutPlace2.jpg"
import imageAbout3 from "../../../assets/imagesHeader/imageAboutPlace3.jpg"

const PanelAbout = () => (

    <div className="self-stretch flex justify-start items-start gap-24">
        <PanelColumn
            title="Our Story"
            items={["Kibbutz Origins", "October 7, 2023"]}
            img={imageAbout1}
        />
        <PanelColumn
            title="Where We Are Now"
            items={["Why We Came Back", "The Return Process", "Community Today"]}
            img={imageAbout2}
        />
        <PanelColumn
            title="Looking Ahead"
            items={["Our Vision", "What We Need", "How You Can Help"]}
            img={imageAbout3}
        />
    </div>
);

export default PanelAbout;