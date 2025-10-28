import React from "react";

type LoupProps = {
    className?: string;
    size?: number;
    strokeWidth?: number;
    color?: string;
    title?: string;
};

const IconLoup: React.FC<LoupProps> = ({
                                           className = "",
                                           size = 24,
                                           strokeWidth = 2,
                                           color,
                                           title = "Search",
                                       }) => {
    const style = color ? { color } : undefined;

    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={title}
            style={style}
        >
            {title ? <title>{title}</title> : null}
            {/* Линза */}
            <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <line
                x1="15.7"
                y1="15.7"
                x2="20.5"
                y2="20.5"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default IconLoup;
