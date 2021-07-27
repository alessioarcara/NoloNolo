import {useEffect, useState} from "react";

const getBreakpoint = (windowWidth) => {
    if (windowWidth < 480) { return "smartphone" }
    else if (windowWidth < 768) { return "tablet" }
    else { return "desktop" }
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getBreakpoint(window.innerWidth))

    useEffect(() => {
        const setSize = () => {
            const currentWindowSize = getBreakpoint(window.innerWidth)
            if (windowSize !== currentWindowSize) { setWindowSize(currentWindowSize) }
        }
        window.addEventListener("resize", setSize)
        return () => window.addEventListener("resize", setSize)
    }, [windowSize])

    return windowSize;
}

export default useWindowSize;
