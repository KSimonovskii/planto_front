import SliderMainPage from "./SliderMainPage.tsx";

const CorporateFavorites = () => {

    return (
        <div
            className="self-stretch px-28 py-16 bg-white inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="w-[1220px] h-[657px] flex flex-col justify-start items-start gap-14">
                <div className="self-stretch flex flex-col justify-start items-start gap-14">
                    <div
                        className="self-stretch justify-start text-lime-800 text-6xl font-bold font-['Rubik'] leading-[56px]">Corporate
                        Favorites
                    </div>
                    <SliderMainPage/>
                </div>
            </div>
        </div>
    )

}

export default CorporateFavorites;