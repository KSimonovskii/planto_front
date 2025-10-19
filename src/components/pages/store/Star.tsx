import React from "react";
import FullStar from "../../../assets/star/full-star.svg";
import HalfStar from "../../../assets/star/half-star.svg";
import EmptyStar from "../../../assets/star/full-star.svg";

type StarProps = {
    type: "full" | "half" | "empty";
    className?: string;
};

const Star: React.FC<StarProps> = ({ type, className }) => {
    switch (type) {
        case "full":
            return <img src={FullStar} alt="Full Star" className={className} />;
        case "half":
            return <img src={HalfStar} alt="Half Star" className={className} />;
        case "empty":
            return <img src={EmptyStar} alt="Empty Star" className={className} />;
        default:
            return null;
    }
};


export default Star;
