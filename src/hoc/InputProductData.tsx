import {type ComponentType} from "react";
import ErrorPage from "../components/ErrorPage.tsx";
// import {PageContext, ProductsContext} from "../utils/context.ts";

export const inputProductData = <T extends object>(Component: ComponentType<T>) => (props: T) => {

    // const EMPTY_FILE = new File([], "", {type: "image/jpg"});

    // const {setProductsData: setProductsData} = useContext(ProductsContext);
    // const {pageNumber, sort, filters} = useContext(PageContext);
    //
    // const [nameProduct, setName] = useState(props.product.name);
    // const [category, setCategory] = useState(props.product.category);
    // const [qty, setQty] = useState(props.product.quantity);
    // const [price, setPrice] = useState(props.product.price);
    // const [imageFile, setImage] = useState(EMPTY_FILE);
    // const [imageUrl, setImageUrl] = useState(props.product.imageUrl);
    // const [description, setDescription] = useState(props.product.description);

    const isError = false;
    const msg = "Something is going wrong.."
    return isError? <ErrorPage msg={msg}/> : <Component {...props}/>
}