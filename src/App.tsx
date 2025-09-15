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
            <PageProvider>
                <ProductsProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <Main/>
                        </BrowserRouter>
                    </CartProvider>
                </ProductsProvider>
            </PageProvider>
        </AuthProvider>
    )
}

export default App
