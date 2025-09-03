type PanelColumnProps = {
    title: string;
    items: string[];
    img?: string;
};

const PanelColumn = ({ title, items, img }: PanelColumnProps) => (
    <div className="flex justify-start items-start gap-4">
        <div className="w-36 flex flex-col gap-4">
            <div className="text-lime-800 text-base font-bold font-['Rubik']">
                {title}
            </div>
            <div className="flex flex-col gap-2">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="text-lime-800 text-base font-normal font-['Rubik']"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
        {img && <img className="w-44 h-28 rounded-lg" src={img} />}
    </div>
);

export default PanelColumn;