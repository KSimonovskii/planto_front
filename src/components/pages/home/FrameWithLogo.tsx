import Logo from "./Logo";
import InputField from "./InputField";
import FrameWithCartIcon from "./FrameWithCartIcon";
import {useNavigate} from "react-router";


const FrameWithLogo = () => {

    const navigate = useNavigate();

    const handlerClickLogo = () => {
        navigate("/")
    }

    return (
        <div className="flex items-center justify-between mb-8">
            <button onClick={handlerClickLogo}
            className="focus:outline-none transition-transform duration-200 hover:scale-125 active:scale-95">
                <Logo/>
            </button>
            <InputField/>
            <FrameWithCartIcon/>
        </div>
    );
};

export default FrameWithLogo;
