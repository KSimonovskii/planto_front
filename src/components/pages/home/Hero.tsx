import hero from "../../../assets/hero.jpg";
import {useNavigate} from "react-router";

const Hero = () => {

    const navigate = useNavigate();

    const handelClickExploreColection = () => {
        navigate("store");
    }

    return (
        <section
            className="self-stretch h-[734px] relative overflow-hidden flex items-center"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div className="w-[588px] left-[110px] top-[195px] absolute inline-flex flex-col justify-center items-start gap-8"/>


            <div className="relative w-[588px] ml-[110px] flex flex-col justify-center items-start gap-8">
                <h1 className="text-white text-7xl font-bold font-rubik">
                    Small plant with big impact
                </h1>

                <p className="text-white text-2xl font-bold font-inter leading-9">
                    Every succulent you buy helps rebuild a kibbutz affected by October 7.
                </p>

                <div className="flex gap-6">
                    <button onClick={handelClickExploreColection}
                            className="w-44 px-6 py-3 bg-lime-600 rounded-lg flex justify-center items-center gap-2 hover:bg-lime-800
                            text-white text-base font-medium font-rubik leading-normal">
                        Explore Collection
                    </button>

                    <button
                        className="w-44 px-6 py-3 bg-white hover:bg-lime-800 rounded-lg outline outline-1 outline-lime-800 flex justify-center items-center gap-2
                        text-lime-800 hover:text-white text-base font-medium font-rubik leading-normal">

                        About the Project

                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
