import {Grip, TableOfContents} from "lucide-react";
import {Field, Label, Switch} from "@headlessui/react";

interface ViewProps {
    viewAsCards: boolean
    setView: (a: boolean) => void
}

const ViewMode = ({setView, viewAsCards}: ViewProps) => {

    return (
        <Field className={"flex space-x-1"}>
            <Label className={"text-base-text"}>View:</Label>
            <label className={`${viewAsCards?'text-base-text' : 'text-alt-text' }`}><TableOfContents/></label>
            <Switch
                checked={viewAsCards}
                onChange={setView}
                className={"group relative flex items-center h-7 w-14 cursor-pointer border-2 border-base-form rounded-full bg-base-bg p-1 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white"}>
                <span className={"pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-base-text shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-6"}/>
            </Switch>
            <label className={`${viewAsCards? 'text-alt-text' : 'text-base-text'}`}><Grip/></label>
        </Field>
    )
}

export default ViewMode