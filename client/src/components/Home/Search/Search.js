import Location from "./Location";
import Modal from "../../UI/Modal/Modal";
import {useEffect, useState} from "react";
import SearchDatePicker from "./SearchDatePicker";
import Button from "../../UI/Button/Button";
import BackIcon from "../../UI/icons/BackIcon";
import classes from "./Search.module.css";
import NavigationBar from "../../Navigation/NavigationBar";


const DUMMY_LOCATIONS = [
    {
        id: 'l1',
        name: 'Campania'
    },
    {
        id: 'l2',
        name: 'Liguria'
    }
]

const Search = ({children, searchRef}) => {
    const [isNextPage, setNextPage] = useState(false)

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
        searchRef.current.focus();
    }, [searchRef])

    return (
        <Modal fullScreen={true}>
            {!isNextPage &&
            <>
                {children}
                {DUMMY_LOCATIONS.map(place =>
                    <Location
                        onClick={moveClickHandler}
                        key={place.id}
                        text={place.name}/>)
                }
                <NavigationBar/>
            </>
            }
            {isNextPage &&
            <>
                <div className={classes[`actions-top`]}>
                    <Button className={classes[`btn-back`]} onClick={moveClickHandler} type="button"><BackIcon/></Button>
                    <Button className={classes[`btn-cancel`]} onClick={cancelSelectionHandler} type="button">Cancella</Button>
                </div>
                <SearchDatePicker/>
                <div className={classes[`actions-bottom`]}>
                    <Button className={classes[`btn-skip`]} onClick={skipClickHandler} type="button">Salta</Button>
                    <Button className={classes[`btn-forward`]} onClick={goForwardClickHandler} type="button">Avanti</Button>
                </div>
            </>
            }
        </Modal>
    );
};

export default Search;