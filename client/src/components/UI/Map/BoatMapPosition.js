import React, {useContext, useState} from "react";
import {Map, Marker, ZoomControl} from "pigeon-maps"
import BreakpointContext from "../../../store/breakpoint-context";

const BoatMapPosition = ({boatPosition}) => {
    const [center, setCenter] = useState(boatPosition)
    const breakpointCtx = useContext(BreakpointContext)

    return (
        <Map defaultCenter={center}
             minZoom={6}
             onBoundsChanged={({center}) => {
                 setCenter(center)
             }}>
            {breakpointCtx.breakpoint === "desktop" && <ZoomControl/>}
            <Marker
                width={50}
                anchor={boatPosition}
            />
        </Map>
    )
}

export default BoatMapPosition;
