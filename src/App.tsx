import './App.css'
import Main from "./components/Main.tsx";
import {AuthProvider} from "./utils/AuthProvider.tsx";
import {BrowserRouter} from "react-router";
import {PageProvider} from "./features/context/PageProvider.tsx";
import {ProductsProvider} from "./features/context/ProductsProvider.tsx";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <PageProvider>
                    <ProductsProvider>
                        <Main/>
                    </ProductsProvider>
                </PageProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
