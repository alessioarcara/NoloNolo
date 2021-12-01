import {createContext, useEffect, useState} from "react";

const BreakpointContext = createContext({
    breakpoint: '',
})

export const BreakpointContextProvider = ({children}) => {
    const [breakpoint, setBreakpoint] = useState(window.innerWidth > 768 ? "desktop" : "smartphone")

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 769px)");

        const handleQueryListener = event => {
            if (event.matches) { setBreakpoint("desktop") }
            else { setBreakpoint("smartphone") }
        }

        mediaQuery.addEventListener('change', handleQueryListener, { passive: true })
        return () => mediaQuery.removeEventListener('change', handleQueryListener);
    }, [])


    const contextValue = {
        breakpoint
    }

    return (
        <BreakpointContext.Provider value={contextValue}>
            {children}
        </BreakpointContext.Provider>
    )
}

export default BreakpointContext
