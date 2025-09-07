import './App.css'
import {AuthProvider} from "./utils/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {PageProvider} from "./features/context/PageProvider.tsx";
import {ProductsProvider} from "./features/context/ProductsProvider.tsx";
import Main from "./components/Main.tsx";
import {CartProvider} from "./features/context/CartContext.tsx";
import "./i18n"

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <PageProvider>
                    <ProductsProvider>
                        <CartProvider>
                            <Main/>
                        </CartProvider>
                    </ProductsProvider>
                </PageProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
