import NavigationBar from "../../../Navigation/NavigationBar";
import {Outlet} from "react-router-dom";

const NavigationLayout = ({authenticated}) => {
    return (
        <>
            <Outlet/>
            <NavigationBar authenticated={authenticated}/>
        </>
    )
};

export default NavigationLayout
