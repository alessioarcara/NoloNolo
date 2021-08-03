import Location from "./Location";
import React, {useEffect, useRef, useState} from "react";
import SearchDatePicker from "./SearchDatePicker";
import BackIcon from "../../UI/icons/BackIcon";
import classes from "./Search.module.css";
import useHttp from "../../../hooks/use-http";
import {body_search} from "../../../helpers/httpConfig";
import {debounce} from "../../../helpers/utils";
import SearchActionButtons from "./SearchActionButtons";

const transformData = resData => resData.listAllLocations

const Search = ({children, searchRef, searchTerm}) => {

    const [isNextPage, setNextPage] = useState(false)
    const {status, data: locations, sendRequest: listAllLocations} = useHttp(true)

    const debouncedListAllLocations = useRef(debounce(
            (searchTerm) => listAllLocations({ body: body_search(searchTerm) }, transformData),
            300));

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
        searchRef.current !== document.activeElement && searchRef.current.focus();
        searchTerm && searchTerm.length > 0 && debouncedListAllLocations.current(searchTerm);
    }, [searchRef, searchTerm])

    return (
        <>
            {!isNextPage &&
            <div className={classes['datepicker-container']}>
                {children}
                {status === "completed" && locations.length > 0 && locations.map(location => {
                    return (
                        <Location
                            onClick={moveClickHandler}
                            key={location.city}
                            city={location.city}
                            region={location.region}/>
                    )
                })
                }
                {status === "completed" && locations.length === 0 && <p>Nessun risultato</p>}
            </div>
            }
            {isNextPage &&
            <div className={classes[`datepicker-container`]}>
                <SearchActionButtons
                    actionClassName={classes[`actions-top`]}
                    firstButtonClassName={classes[`btn-back`]}
                    firstButtonClickHandler={moveClickHandler}
                    firstButtonText={<BackIcon/>}
                    secondButtonClassName={classes[`btn-cancel`]}
                    secondButtonClickHandler={cancelSelectionHandler}
                    secondButtonText='Cancella'
                />
                <SearchDatePicker/>
                <SearchActionButtons
                    actionClassName={classes[`actions-bottom`]}
                    firstButtonClassName={classes[`btn-skip`]}
                    firstButtonClickHandler={skipClickHandler}
                    firstButtonText='Salta'
                    secondButtonClassName={classes[`btn-forward`]}
                    secondButtonClickHandler={goForwardClickHandler}
                    secondButtonText='Avanti'
                />
            </div>
            }
        </>
    );
};

export default Search;
