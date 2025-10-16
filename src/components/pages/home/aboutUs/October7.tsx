import image0 from "../../../../assets/aboutUs/october7/October7.png"
import image1 from "../../../../assets/photoKibbutzAfter7Oct.png"

export const October7 = () => {

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
                    alt="Foto kibutz Ein HaShlosha 7 October"
                    className="w-[1208px] max-w-full h-auto mb-[48px] object-cover"
                />

                <div className="max-w-[1208px] text-lime-800 text-base font-['Rubik'] leading-relaxed">
                    <p>
                        On October 7, Hamas terrorists invaded{" "}
                        <span className="font-bold">Kibbutz Ein HaShlosha</span> as part of the
                        brutal attack on Israel. Houses were burned and looted, and{" "}
                        <span className="font-bold">four residents were murdered</span>, including
                        elderly women, parents, and community leaders.
                    </p>
                    <br/>
                    <p>
                        The assault lasted <span className="font-bold">six hours</span>, with
                        families hiding in safe rooms as terrorists tried to force them out by
                        setting homes on fire. Survivors recall children lying in silence while
                        their parents fought to keep doors closed until the army arrived.
                    </p>
                    <br/>
                    <p>
                        Some residents managed to escape through flames, while others faced
                        terrorists breaking into their homes, demanding weapons or money. Entire
                        families were traumatized, and the kibbutz infrastructure was left in
                        ruins.
                    </p>
                    <br/>
                    <p>
                        The survivors were evacuated only on the{" "}
                        <span className="font-bold">evening of October 8</span> and remained in
                        evacuation for almost two years, until{" "}
                        <span className="font-bold">August 2025</span>. Now they have returned,
                        but the work of rebuilding the kibbutz is immense and still ongoing.
                    </p>
                </div>
            </div>
        </div>
    )
}
