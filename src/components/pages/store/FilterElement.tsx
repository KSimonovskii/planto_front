import FilterCheckbox from "./FilterCheckbox.tsx";

type FilterData  = {
    title: string;
    count: number;
    handleClick: (isChecked: boolean, title?: string) => (void);
}

interface Props {
    filterData: FilterData[]
}

const FilterElement = ({filterData} : Props) => {
    return (
        <div className={"self-stretch flex flex-col justify-start items-start gap-6 "}>
            <div className="self-stretch flex flex-col justify-center items-center gap-4">
                <div className="self-stretch px-4 flex flex-col justify-start items-start gap-4">
                    {filterData.map((data, i) => (
                        <div key={`${i}-1`} className="self-stretch inline-flex justify-start items-center gap-3.5">
                            <FilterCheckbox key={i} title={data.title} count={data.count} handleClick={data.handleClick}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="self-stretch h-px relative">
                <div className="w-64 h-px left-0 top-0 absolute">
                    <div className="w-64 h-px left-0 top-0 absolute bg-zinc-300" />
                </div>
            </div>
        </div>
    );
};

export default FilterElement;