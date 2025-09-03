import './App.css'
import {AuthProvider} from "./utils/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {PageProvider} from "./features/context/PageProvider.tsx";
import {ProductsProvider} from "./features/context/ProductsProvider.tsx";
import Main from "./components/Main.tsx";

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
