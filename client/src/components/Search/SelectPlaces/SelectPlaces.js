import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import classes from "./SelectPlaces.module.css";
import SearchBar from "../../UI/SearchBar/SearchBar";
import Location from "./Location";
import useHttp from "../../../hooks/use-http";
import {debounce} from "../../../helpers/Utils/utils";
import {body_search} from "../../../helpers/httpConfig";
import BreakpointContext from "../../../store/breakpoint-context";


const transformData = resData => resData.listAllLocations

const SelectPlaces = ({closeModalHandler, moveClickHandler}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const {error, status, data: locations, sendRequest: listAllLocations} = useHttp(true)
    const breakpointCtx = useContext(BreakpointContext)

    const searchRef = useRef()
    const debouncedListAllLocations = useRef(debounce(
        (searchTerm) => listAllLocations({body: body_search(searchTerm)}, transformData),
        300));

    const changeHandler = useCallback(event => {
        setSearchTerm(event.target.value)
    }, [])

    useEffect(() => {
        searchRef.current !== document.activeElement && searchRef.current.focus();
        searchTerm && searchTerm.length > 0 && debouncedListAllLocations.current(searchTerm);
    }, [searchRef, searchTerm])

    let content;
    if (status === "completed" && !error && locations.length > 0) {
        content = locations.map(location =>
            <Location
                moveClickHandler={moveClickHandler}
                key={location.city}
                city={location.city}
                region={location.region}
            />
        )
    }
    if (status === "completed" && !error && locations.length === 0) {
        content = <p>Nessun risultato</p>
    }
    if (status === "completed" && error) {
        content = <p>Non è stato possibile contattare il server</p>
    }

    return (
        <>
            <div className={classes.header}>
                <SearchBar
                    isWhite={true}
                    ref={searchRef}
                    searchTerm={searchTerm}
                    changeHandler={changeHandler}
                />
                {breakpointCtx.breakpoint === "smartphone" &&
                <span onClick={closeModalHandler} className={classes.close}>&times;</span>}
            </div>
            {content}
        </>
    )
}

export default SelectPlaces;
