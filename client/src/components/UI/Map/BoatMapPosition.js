import React, {useContext} from "react";
import {Map, Marker, ZoomControl} from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import BreakpointContext from "../../../store/breakpoint-context";

const BoatMapPosition = ({boatPosition}) => {
    const maptilerProvider = maptiler('DcfLwyTnMIbhKLG6aqVn', 'streets')
    const breakpointCtx = useContext(BreakpointContext)

    return (
        <Map
            provider={maptilerProvider}
            dprs={[1, 2]}
            defaultCenter={[42.384, 12.613]}
            defaultZoom={6}
            mouseEvents={false}
            touchEvents={false}
            minZoom={6}
            center={boatPosition}
        >
            {breakpointCtx.breakpoint === "desktop" && <ZoomControl/>}
            <Marker
                width={50}
                color="black"
                anchor={boatPosition}
            />
        </Map>
    )
}

export default BoatMapPosition;
