import spinner from "../assets/spinner2.png";

const SpinnerFlower = () => {

    return (
        <div className="flex justify-center items-center w-full h-40 sm:h-56 lg:h-64">
            <img
                src={spinner}
                alt="loading..."
                className="w-12 h-12 sm:w-16 sm:h-16 animate-spin"
            />
        </div>
    )

}

export default SpinnerFlower;