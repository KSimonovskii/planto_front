import cf1 from "../../../assets/clientsAndFriends/Client.png"
import cf2 from "../../../assets/clientsAndFriends/Client (1).png"
import cf3 from "../../../assets/clientsAndFriends/Client (2).png"
import cf4 from "../../../assets/clientsAndFriends/Client (3).png"
import cf5 from "../../../assets/clientsAndFriends/Client (4).png"
import cf6 from "../../../assets/clientsAndFriends/Client (5).png"
import {useTranslation} from "react-i18next";


const OurClientsAndFrends = () => {
const {t} = useTranslation();

    return (
        <div
            className="w-full px-2 pt-16 pb-10 bg-white inline-flex flex-col gap-2.5 overflow-hidden border-t-2 border-lime-800/20">
            <div className="w-full h-60 flex flex-col gap-14">
                <div className="text-lime-800 px-2 text-6xl font-bold font-['Rubik']">
                    {t("clientsFriends")}
                </div>
                <div data-property-1="Default" className="w-full h-16 flex items-center justify-between">
                    <img className="object-contain"
                         src={cf1}/>
                    <img className="object-contain"
                         src={cf2}/>
                    <img className="object-contain"
                         src={cf3}/>
                    <img className="object-contain"
                         src={cf4}/>
                    <img className="object-contain"
                         src={cf5}/>
                    <img className="object-contain"
                         src={cf6}/>
                </div>
            </div>
        </div>
    )

}

export default OurClientsAndFrends