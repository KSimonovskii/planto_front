import {Grip, TableOfContents} from "lucide-react";
import {Switch} from "@headlessui/react";

interface ViewProps {
    viewAsCards: boolean
    setView: (a: boolean) => void
}

const ViewMode = ({setView, viewAsCards}: ViewProps) => {

    return (
        <div className="flex items-center gap-2">
            <span className={`transition-colors ${!viewAsCards ? 'text-lime-600' : 'text-gray-400'}`}>
                <TableOfContents size={20}/>
            </span>
            <Switch
                checked={viewAsCards}
                onChange={setView}
                className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 data-[checked]:bg-lime-600">
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
            </Switch>
            <span className={`transition-colors ${viewAsCards ? 'text-lime-600' : 'text-gray-400'}`}>
                <Grip size={20}/>
            </span>
        </div>
    )
}

export default ViewMode
