import PanelColumn from "./PanelColumn.tsx";

const PanelCare = () => (
    <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-24 w-full">
        <PanelColumn
            title="Watering"
            items={["How Often", "Signs of Overwatering"]}

        />

    </div>
);

export default PanelCare;