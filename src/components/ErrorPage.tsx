import {useLocation} from "react-router";

interface PropsError {
    msg: string;
}

const ErrorPage = (props: PropsError) => {

    const param = useLocation();
    let message = "";
    if (param) {
        message = param.state as string? param.state.message : "";
    }

    console.log(message);

    if (!message) {
        message = props.msg;
    }

    return (
        <>
            <p className={"text-base-form text-xl w-full"}>{message}</p>
        </>
    )
}

export default ErrorPage