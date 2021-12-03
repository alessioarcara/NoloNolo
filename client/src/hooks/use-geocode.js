import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {NOMINATIM_BASE_URL} from "../helpers/Utils/constants";
import {debounce} from "../helpers/Utils/utils";

const UseGeocode = (region, city, initialCoordinates = {lat: null, lon: null}, delay = 1000) => {
    const coordinatesRef = useRef(initialCoordinates)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fromAddress = useRef(debounce(async (city, region) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${NOMINATIM_BASE_URL}city=${city}&state=${region}&country=Italy`)
            const data = await response.data[0]

            if (data.lat !== null && data.lon !== null)
                coordinatesRef.current = {lat: parseFloat(data.lat), lon: parseFloat(data.lon)}
        }
        catch (err) { setError(err) }
        finally { setIsLoading(false) }
    }, delay))

    useEffect(() => {
        if (region.length >= 4 && city.length >= 4) {
            fromAddress.current(city, region)
        }
    }, [region, city])

    return {coordinates: coordinatesRef.current, isLoading, error};
};

export default UseGeocode;
