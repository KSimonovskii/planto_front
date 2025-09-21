import Filters from "./Filters.tsx";
import Sorting from "../../common/table/Sorting.tsx";
import {dataTypes} from "../../../utils/enums/dataTypes.ts";

const FiltersAndSorting = () => {
    return (
            <div className="w-128 h-16 relative bg-white rounded-lg overflow-hidden">
                <div className="w-128 pr-4 py-4 left-0 top-0 absolute inline-flex justify-start items-center gap-8">
                    <Filters/>
                    {/*<Popover className="group">*/}
                        {/*<PopoverButton className={"inline-flex justify-start items-center gap-2"}>*/}
                        {/*    <div className="justify-start text-lime-800 text-base font-bold font-['Rubik']">*/}
                        {/*        Sort by*/}
                        {/*    </div>*/}
                        {/*    <ChevronDownIcon className="size-5 group-data-open:rotate-180" />*/}
                        {/*</PopoverButton>*/}
                        {/*<PopoverPanel*/}
                        {/*    transition*/}
                        {/*    anchor="bottom"*/}
                        {/*    className="w-64 h-[842px] py-2 left-0 top-[35px] absolute bg-white rounded-[5px] inline-flex justify-start items-center gap-2.5">*/}
                        {/*    <div className="w-64 h-[789px] inline-flex flex-col justify-start items-start gap-6">*/}
                        {/*        <div className="self-stretch flex flex-col justify-start items-start gap-6">*/}
                        {/*            Sorting*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</PopoverPanel>*/}
                    {/*</Popover>*/}
                    <Sorting dataType={dataTypes.products}/>
                </div>
            </div>
    );
};

export default FiltersAndSorting;