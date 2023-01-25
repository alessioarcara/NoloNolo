import {Outlet, useLocation} from "react-router-dom";
import NavigationBar from "../../Navigation/NavigationBar";
import Footer from "../../Footer/Footer";
import useIntersectionObserver from "../../../../hooks/use-intersection-observer";
import {useMemo, useRef} from "react";

const NavigationLayout = ({authenticated}) => {
    const navigationRef = useRef()
    const location = useLocation()

    const options = useMemo(() => {
        return {
            root: navigationRef.current
        }
    }, [navigationRef])

    const [ref, isIntersecting] = useIntersectionObserver(options)

    return (
        <>
            <Outlet/>
            <NavigationBar isIntersecting={isIntersecting} ref={navigationRef} authenticated={authenticated}/>
            {location.pathname === "/" && <Footer ref={ref} />}
        </>
    )
};

export default NavigationLayout
