import NavigationBar from "../../../Navigation/NavigationBar";
import {Outlet} from "react-router-dom";

const NavigationLayout = () => {
    return (
        <>
            <Outlet/>
            <NavigationBar/>
        </>
    )
};

export default NavigationLayout
