import {useEffect, useState} from "react";

const useMediaQuery = () => {
    const [breakpoint, setBreakpoint] = useState(window.innerWidth > 768 ? "desktop" : "smartphone")

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleQueryListener = event => {
            if (event.matches) { setBreakpoint("desktop") }
            else { setBreakpoint("smartphone") }
        }

        mediaQuery.addEventListener('change', handleQueryListener)
        return () => mediaQuery.removeEventListener('change', handleQueryListener);
    }, [])

    return breakpoint;
}

export default useMediaQuery;
