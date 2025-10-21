import { useTranslation } from "react-i18next";

import cf1 from "../../../assets/clientsAndFriends/Client.png";
import cf2 from "../../../assets/clientsAndFriends/Client (1).png";
import cf3 from "../../../assets/clientsAndFriends/Client (2).png";
import cf4 from "../../../assets/clientsAndFriends/Client (3).png";
import cf5 from "../../../assets/clientsAndFriends/Client (4).png";
import cf6 from "../../../assets/clientsAndFriends/Client (5).png";

const OurClientsAndFriendsMobile = () => {
    const { t } = useTranslation();

    const clients = [cf1, cf2, cf3, cf4, cf5, cf6];

    return (
        <div className="w-full bg-white py-8 border-t-2 border-lime-800/20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col gap-6">

                <h2 className="flex justify-center text-lime-800 text-2xl sm:text-3xl font-bold font-['Rubik'] truncate">
                    {t("clientsFriends")}
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center items-center">
                    {clients.map((client, index) => (
                        <div key={index} className="w-16 sm:w-20 md:w-24 flex justify-center items-center">
                            <img
                                src={client}
                                alt={`client-${index}`}
                                className="object-contain w-full h-auto opacity-80 hover:opacity-100 transition duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurClientsAndFriendsMobile;
