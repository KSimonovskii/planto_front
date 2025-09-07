import cf1 from "../../../assets/clientsAndFriends/cf1.png"
import cf2 from "../../../assets/clientsAndFriends/cf2.png"
import cf3 from "../../../assets/clientsAndFriends/cf3.png"
import cf4 from "../../../assets/clientsAndFriends/cf4.png"
import cf5 from "../../../assets/clientsAndFriends/cf5.png"
import cf6 from "../../../assets/clientsAndFriends/cf6.png"
import {useTranslation} from "react-i18next";


const OurClientsAndFrends = () => {
const {t} = useTranslation();

    return (
        <div
            className="w-[1440px] px-28 pt-16 pb-10 bg-white border-t-2 border-lime-800/20 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="w-[1222px] h-60 flex flex-col justify-start items-start gap-14">
                <div className="self-stretch justify-start text-lime-800 text-6xl font-bold font-['Rubik']">
                    {t("clientsFriends")}
                </div>
                <div data-property-1="Default" className="w-[1221px] h-16 relative overflow-hidden">
                    <img className="w-44 h-16 left-0 top-0 absolute rounded-lg"
                         src={cf1}/>
                    <img className="w-44 h-16 left-[207px] top-0 absolute rounded-lg"
                         src={cf2}/>
                    <img className="w-44 h-16 left-[415px] top-0 absolute rounded-lg"
                         src={cf3}/>
                    <img className="w-44 h-16 left-[622px] top-0 absolute rounded-lg"
                         src={cf4}/>
                    <img className="w-44 h-16 left-[829px] top-0 absolute rounded-lg"
                         src={cf5}/>
                    <img className="w-44 h-16 left-[1037px] top-0 absolute rounded-lg"
                         src={cf6}/>
                </div>
            </div>
        </div>
    )

}

export default OurClientsAndFrends