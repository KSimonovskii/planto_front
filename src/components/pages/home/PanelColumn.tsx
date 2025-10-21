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
        <div
            className="flex flex-col items-center justify-center text-center cursor-pointer gap-3"
            onClick={onClick}
        >

            <NavLink
                to={getBasePath()}
                className="text-lime-800 text-lg font-bold font-['Rubik'] mb-2 hover:underline transition"
            >
                {title}
            </NavLink>

            {img && (
                <NavLink to={getBasePath()} className="block w-full max-w-[200px]">
                    <img
                        className="w-full rounded-xl hover:opacity-90 transition mb-6"
                        src={img}
                        alt={title}
                    />
                </NavLink>
            )}

            {isSubMenu && (
                <div className="flex flex-col gap-2 mt-2">
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
            )}
        </div>
    );
};

export default PanelColumn;
