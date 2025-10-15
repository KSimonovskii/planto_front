import { NavLink } from "react-router";

type Item = {
    title: string;
    path?: string;
};

type PanelColumnProps = {
    title: string;
    img?: string;
    path?: string;
    hierarchy?: string;
    items?: Item[];
    onClick?: () => void;
};

const PanelColumn = ({ title, items, img, path, hierarchy, onClick }: PanelColumnProps) => {
    const isSubMenu = items && items.length > 0;

    const encode = (str: string) => encodeURIComponent(str);

    const getPathForItem = (item: Item) => {
        if (item.path) return item.path;
        if (!hierarchy) return "/";
        return `/store/${encode(hierarchy)}/${encode(title)}/${encode(item.title)}`;
    };

    const getBasePath = () => {
        if (path) return path;
        if (!hierarchy) return "/";
        return `/store/${encode(hierarchy)}/${encode(title)}`;
    };

    return (
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 w-full md:w-auto cursor-pointer"
             onClick={onClick}>
            <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full md:w-36">
                {isSubMenu ? (
                    <div className="text-lime-800 text-base font-bold font-['Rubik']">
                        {title}
                        <div className="flex flex-col gap-2">
                            {items!.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={getPathForItem(item)}
                                    className="text-lime-800 text-base font-normal font-['Rubik'] hover:underline transition"
                                >
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ) : (
                    <NavLink
                        to={getBasePath()}
                        className="text-lime-800 text-base font-bold font-['Rubik'] hover:underline transition"
                    >
                        {title}
                    </NavLink>
                )}
            </div>

            {img && (
                <NavLink to={getBasePath()} className="block">
                    <img
                        className="w-full md:w-44 h-28 md:h-28 rounded-lg object-cover hover:opacity-90 transition"
                        src={img}
                        alt={title}
                    />
                </NavLink>
            )}
        </div>
    );
};

export default PanelColumn;
