import './App.css'
import {AuthProvider} from "./utils/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {PageProvider} from "./features/context/PageProvider.tsx";
import {ProductsProvider} from "./features/context/ProductsProvider.tsx";
import Main from "./components/Main.tsx";
import {CartProvider} from "./features/context/CartContext.tsx";
import "./i18n"
import {OrdersProvider} from "./components/pages/orders/OrderProvider.tsx";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <PageProvider>
                    <ProductsProvider>
                        <CartProvider>
                            <OrdersProvider>
                                <Main/>
                            </OrdersProvider>
                        </CartProvider>
                    </ProductsProvider>
                </PageProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
