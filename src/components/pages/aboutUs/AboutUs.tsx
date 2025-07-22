import aboutUs from "../../images/Image_Story.jpg";

const AboutUsPage = () => {

    return (
        <div className="w-full h-auto bg-gray-200 flex items-center justify-center relative overflow-hidden">

            <img
                src={aboutUs}
                className="w-screen h-screen object-contain transition-opacity duration-300"
            />
        </div>
    );
};

export default AboutUsPage;