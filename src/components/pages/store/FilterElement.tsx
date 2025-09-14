type FilterData  = {
    title: string;
    count: numeric;
}

interface Props {
    filterData: FilterData[]
}

const FilterElement = ({filterData} : Props) => {
    return (
        <div className={"self-stretch flex flex-col justify-start items-start gap-6"}>
            <div className="self-stretch flex flex-col justify-center items-center gap-4">
                <div className="self-stretch px-4 flex flex-col justify-start items-start gap-4">
                    {filterData.map((data, i) => (
                        <div key={`${i}-1`} className="self-stretch inline-flex justify-start items-center gap-3.5">
                            <div className="w-5 h-5 relative">
                                <div className="w-5 h-5 left-0 top-0 absolute bg-white rounded-[3px] border border-zinc-300" />
                            </div>
                            <div key={`title-${i}`} className="w-32 justify-start text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">{data.title}</div>
                            <div key={`count-${i}`} className="w-9 text-right justify-start text-neutral-400 text-xs font-normal font-['Poppins'] leading-none">{data.count}</div>
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