import classes from './DetailsModal.module.css'
import {useState} from "react";
import DetailsModalHeader from "./DetailsModalHeader/DetailsModalHeader";
import RentalActivePage from "../RentalActivePage/RentalActivePage";

const DetailsModal = ({start, end, customer, totalAmount}) => {
    const [rentalsState, setRentalsState] = useState("active")

    return (
        <>
            <DetailsModalHeader rentalsState={rentalsState} setRentals={setRentalsState}/>
            {rentalsState === 'active' &&
                <RentalActivePage
                    start={start}
                    end={end}
                    customer={customer}
                    totalAmount={totalAmount}
                />
            }
        </>
    );
}

export default DetailsModal