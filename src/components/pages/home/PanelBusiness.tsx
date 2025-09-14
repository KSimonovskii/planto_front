import PanelColumn from "./PanelColumn.tsx";
import imageBusiness1 from "../../../assets/imagesHeader/imageForBusinessPlace1.png";
import imageBusiness2 from "../../../assets/imagesHeader/imageForBusinessPlace2.png";
import imageBusiness3 from "../../../assets/imagesHeader/imageForBusinessPlace3.png";

const PanelBusiness = () => {

    const hierarchy = "Succulents-for-business";
    //TODO - create universal mechanism for items of product menu:
    // every item has filter value
    // may vbe its will be a map
    const items1 = [
        {
            title: "Eco Wrapping",
            path: `/store/${hierarchy}`,
        },
        {
            title: "Mini Ceramic Pot",
            path: `/store/${hierarchy}`,
        },
        {
            title: "Branded Sleeve",
            path: `/store/${hierarchy}`,
        }
    ]

    const items2 = [
        {
            title: "Single Plants",
            path: `/store/${hierarchy}`,
        },
        {
            title: "Succulent Sets",
            path: `/store/${hierarchy}`,
        }
    ]

    const items3 = [
        {
            title: "Single Plants",
            path: `/store/${hierarchy}`,
        },
        {
            title: "Succulent Sets",
            path: `/store/${hierarchy}`,
        }
    ]


    return (
        <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-24 w-full">
            <PanelColumn
                title="Mini gifts"
                items={items1}
                img={imageBusiness1}
            />
            <PanelColumn
                title="Standart Gifts"
                items={items2}
                img={imageBusiness2}
            />
            <PanelColumn
                title="Premium"
                items={items3}
                img={imageBusiness3}
            />
        </div>
    )
};

export default PanelBusiness;