import classes from './DetailsModal.module.css'
import {useState} from "react";
import DetailsModalHeader from "./DetailsModalHeader/DetailsModalHeader";
import RentalsPreviousPage from "./RentalsPreviousPage/RentalsPreviousPage";
import RentalActivePage from "./RentalActivePage/RentalActivePage";
import RentalsFuturePage from "./RentalsFuturePage/RentalsFuturePage";

const DetailsModal = () => {
    const [rentalsState, setRentalsState] = useState("active")

    return (
        <>
            <DetailsModalHeader rentalsState={rentalsState} setRentals={setRentalsState}/>
        </>
    );
}

export default DetailsModal