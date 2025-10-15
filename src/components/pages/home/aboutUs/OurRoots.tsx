import image0 from "../../../../assets/aboutUs/ourRoots/ourRootsMain.png"
import image1 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 1.png"
import image2 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 2.png"
import image3 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 3.png"
import image4 from "../../../../assets/aboutUs/ourRoots/101709_kibbutz_ein_hasholsha_PikiWiki_Israel 4.png"

const OurRoots = () => {

    return (
        <div>
            <div>
                <img
                    src={image0}
                    alt="Our Roots"
                    className="w-full"
                />
            </div>
            {/*1*/}
            <div className="inline-flex items-center w-full">

                <div className="w-1/2 mx-4">
                    <span
                        className="text-lime-800 text-base font-bold font-['Rubik']">Kibbutz Ein HaShlosha</span><span
                    className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">, founded in </span><span
                    className="text-lime-800 text-base font-bold font-['Rubik']">1950 </span><span
                    className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">by young Zionist immigrants from South America, was named in memory of three of its founding members who fell in Israel’s War of Independence.</span>
                </div>

                <div className="w-1/2 flex justify-center">
                    <img src={image1}
                         alt="Image 1"
                         className="w-full"/>
                </div>
            </div>
            {/*2*/}
            <div className="inline-flex items-center w-full">

                <div className="w-1/2 flex justify-center">
                    <img src={image2}
                         alt="Image 2"
                         className="w-full"/>
                </div>

                <div className="w-1/2 mx-4">
                    <div><span
                        className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">From the very beginning, life here was marked by </span><span
                        className="text-lime-800 text-base font-bold font-['Rubik']">constant security challenges </span><span
                        className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">— infiltrations, shelling, and even terror tunnels from Gaza. Despite this, families stayed, built homes, and protected their community.</span>
                    </div>
                </div>

            </div>
            {/*3*/}
            <div className="inline-flex items-center w-full">

                <div className="w-1/2 mx-4">
                    <div><span
                        className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">Over the decades, the kibbutz became known for its </span><span
                        className="text-lime-800 text-base font-bold font-['Rubik']">agriculture</span><span
                        className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal"> (wheat, sunflowers, vegetables), livestock (turkeys and dairy cows), and small businesses like a</span><span
                        className="text-lime-800 text-base font-bold font-['Rubik']"> brewery and bakery.</span></div>
                </div>

                <div className="w-1/2 flex justify-center">
                    <img src={image3}
                         alt="Image 3"
                         className="w-full"/>
                </div>
            </div>
            {/*4*/}
            <div className="inline-flex items-center w-full">

                <div className="w-1/2 flex justify-center">
                    <img src={image4}
                         alt="Image 4"
                         className="w-full"/>
                </div>

                <div className="w-1/2 mx-4">
                    <div>
                        <div><span
                            className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">Beyond the economy, Ein HaShlosha grew into a </span><span
                            className="text-lime-800 text-base font-bold font-['Rubik']">vibrant community</span><span
                            className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal"> with schools, sports fields, a clinic, and cultural life, a place where residents combined resilience with hope.<br/>For new members, joining meant being part of a </span><span
                            className="text-lime-800 text-base font-bold font-['Rubik']">Zionist mission</span><span
                            className="text-lime-800 text-base font-normal font-['Rubik'] leading-normal">, contributing to growth, and helping shape a close-knit, meaningful community.</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default OurRoots;