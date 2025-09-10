type PanelColumnProps = {
    title: string;
    items?: string[];
    img?: string;
};

const PanelColumn = ({ title, items, img }: PanelColumnProps) => (
    <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full md:w-36">
            <div className="text-lime-800 text-base font-bold font-['Rubik']">{title}</div>

            {items && (
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
            )}
        </div>

        {img && (
            <img
                className="w-full md:w-44 h-28 md:h-28 rounded-lg object-cover"
                src={img}
                alt={title}
            />
        )}
    </div>
);

export default PanelColumn;
