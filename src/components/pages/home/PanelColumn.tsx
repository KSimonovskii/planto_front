import {NavLink} from "react-router";

type Item = {
    title: string,
    path?: string
}

type PanelColumnProps = {
    title: string;
    items?: Item[];
    img?: string;
    path?: string;
};

const PanelColumn = ({ title, items, img, path }: PanelColumnProps) => {

    const isSubMenu = (items && items.length > 0);

    const prepareString = (str : string) => (str.replace(" ","-"));

    const getPathForItem = (item : Item) => {

        if (!item.path) {
            return "/";
        }

        return `${item.path}/${prepareString(title)}/${prepareString(item.title)}`;
    }

    return (
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 w-full md:w-auto">
            <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full md:w-36">

                {isSubMenu && (
                    <div className="text-lime-800 text-base font-bold font-['Rubik']">{title}
                        <div className="flex flex-col gap-2">
                            {items.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={getPathForItem(item)}
                                    className="text-lime-800 text-base font-normal font-['Rubik']"
                                >
                                    {item.title}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
                {!isSubMenu && (
                    <NavLink
                        to={path? path : "/"}
                        className={"text-lime-800 text-base font-bold font-['Rubik']"}>
                        {title}
                    </NavLink>
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
}

export default PanelColumn;
