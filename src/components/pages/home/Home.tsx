import bgImage from "../../images/homePageImage.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomePage = () => {

    return (
        <div className="bg-[#fefaf1] text-[#2a4637] min-h-screen pt-24">

            <section
                className="bg-[#e9f3e1] opacity-75 py-52 px-6 flex flex-col md:flex-row items-center justify-center gap-12"
                style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold mb-4">Planto</h1>
                    <p className="text-lg text-[#5e6e63]">Let it grow</p>
                </div>
            </section>
            <section className="py-16 px-6 max-w-7xl mx-auto">

            </section>

        </div>
    );
};

export default HomePage;
