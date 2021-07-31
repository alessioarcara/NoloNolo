import {useState, useEffect} from "react";

const ScrollSmooth = ({position = 0, children, className}) => {
    const [isShow, setIsShow] = useState(false);

    const scrollSmooth = () => {
        window.scrollTo({
            top: position,
            behavior: "smooth"
        })
    };

    useEffect(() => {
        const toVisible = () => {
            if (window.scrollY > 0) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        }

        window.addEventListener("scroll", toVisible);
        return () => window.removeEventListener("scroll", toVisible);
    }, []);

    return (
        <>
            {isShow && <div className={className} onClick={scrollSmooth}>{children}</div>}
        </>
    );
};

export default ScrollSmooth;