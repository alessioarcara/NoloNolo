import classes from "./BoatIcons.module.css"

const BoatIcon = props => {
    return (
        <svg
            width="84"
            height="48"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 10 84 44"
            className="mb-2"
            strokeWidth="1.5"
        >
            <g fill="none" className={classes["boat-icons"]}>
                <path
                    d="M17.8 31.8C17.2 31.9 16.9 32.3 17 32.9L18.5 39C18.7 39.5 19.2 39.9 19.8 39.9L56.3 39.9C59.9 39.9 64.6 37.6 66.8 34.8L72.2 27.7C72.5 27.3 72.3 27 71.8 27L17.8 31.8Z">
                </path>
                <path
                    d="M36.2 28.3L49.1 22.4C49.6 22.2 50.4 22.3 50.8 22.6L55.8 26.5 36.2 28.3Z">
                </path>
                <path
                    d="M20 29.9L20 29.5C20 27 18 25.4 15.6 26L15.4 26C13 26.6 11 29 11 31.5L11 34C11 34.5 11.4 35 12 35L16.1 35 15.5 32.3C15.2 31.3 15.9 30.3 17 30.2L20 29.9Z">
                </path>
                <polygon points="0 0 84 0 84 44 0 44">
                </polygon>
            </g>
        </svg>
    );
};

export default BoatIcon;
