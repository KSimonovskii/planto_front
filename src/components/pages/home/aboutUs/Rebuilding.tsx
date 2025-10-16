import image0 from "../../../../assets/aboutUs/rebuilding/Rebuilding.png";
import image1 from "../../../../assets/aboutUs/rebuilding/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1.png";

export const Rebuilding = () => {

    return (
        <div>

            <div>
                <img src={image0}
                     alt="October 7"
                     className="w-full"/>
            </div>

            <div className="px-[110px] pt-[64px] pb-[40px] flex flex-col items-center">
                <img
                    src={image1}
                    alt="Rebulding"
                    className="w-[1208px] max-w-full h-auto mb-[48px] object-cover"
                />

                <div className="max-w-[1208px] text-lime-800 text-base font-['Rubik'] leading-relaxed">
                    Kibbutz Ein HaShlosha is now in a stage of rebuilding and renewal. In August 2025, our residents finally returned home after a long evacuation. We warmly invite you to support our recovery, either by making a direct donation or by purchasing our succulents, with part of the proceeds going directly to the restoration of the kibbutz.
                </div>
            </div>
        </div>
    )

}