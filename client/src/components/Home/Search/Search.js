import Location from "./Location";
import React, {useEffect, useState} from "react";
import SearchDatePicker from "./SearchDatePicker";
import Button from "../../UI/Button/Button";
import BackIcon from "../../UI/icons/BackIcon";
import classes from "./Search.module.css";
import useHttp from "../../../hooks/use-http";
import {body_search} from "../../../helpers/httpConfig";


const Search = ({children, searchRef, text}) => {
    const [isNextPage, setNextPage] = useState(false)
    const {status, data: locations, sendRequest: listAllLocations} = useHttp(true)

    const moveClickHandler = () => {
        setNextPage(prevState => !prevState)
    }

    const cancelSelectionHandler = () => {

    }

    const skipClickHandler = () => {

    }

    const goForwardClickHandler = () => {

    }

    useEffect(() => {
        if (searchRef.current !== document.activeElement) {
            searchRef.current.focus();
        }

        const transformData = resData => resData.listAllLocations

        if (text.length > 0) { listAllLocations({body: body_search(text)}, transformData) }

    }, [searchRef, text, listAllLocations])

    return (
        <>
            {!isNextPage &&
            <>
                {children}
                {status === "completed" && locations.length > 0 && locations.map(location => {
                    if (location.city) {
                    return (
                        <Location
                            onClick={moveClickHandler}
                            key={location.city}
                            region={location.city}/>
                    ) } else {
                        return (
                            <Location
                                onClick={moveClickHandler}
                                key={location.city}
                                city={location.region}/>
                        )
                    }
                }
                )}
                {status === "completed" && locations.length === 0 && <p>Nessun risultato</p>}
            </>
            }
            {isNextPage &&
            <>
                <div className={classes[`actions-top`]}>
                    <Button className={classes[`btn-back`]} onClick={moveClickHandler}
                            type="button"><BackIcon/></Button>
                    <Button className={classes[`btn-cancel`]} onClick={cancelSelectionHandler}
                            type="button">Cancella</Button>
                </div>
                <SearchDatePicker/>
                <div className={classes[`actions-bottom`]}>
                    <Button className={classes[`btn-skip`]} onClick={skipClickHandler} type="button">Salta</Button>
                    <Button className={classes[`btn-forward`]} onClick={goForwardClickHandler}
                            type="button">Avanti</Button>
                </div>
            </>
            }
        </>
    );
};

export default Search;
