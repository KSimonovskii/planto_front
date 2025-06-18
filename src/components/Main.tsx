import Navigation from "./Navigation.tsx";
import Workspace from "./Workspace.tsx";

const Main = () => {
    return (
        <main className={"grid grid-cols-7 gap-4 h-full"}>
            <Navigation/>
            <Workspace/>
        </main>
    )
}

export default Main

