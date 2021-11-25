import {useState} from "react";
import DetailsModalHeader from "./DetailsModalHeader/DetailsModalHeader";
import RentalsPrevious from "../RentalsPrevious/RentalsPrevious";
import RentalActive from "../RentalActive/RentalActive";
import RentalsFuture from "../RentalsFuture/RentalsFuture";

const DetailsModal = () => {
    const [rentalsState, setRentalsState] = useState("active")

    // TO DO: passare i dati come props oppure fare una fetch qui passando rentalId ?

    return (
        <>
            <DetailsModalHeader rentalsState={rentalsState} setRentals={setRentalsState}/>
            {rentalsState === 'previous' &&
                <RentalsPrevious/>
            }
            {rentalsState === 'active' &&
                <RentalActive/>
            }
            {rentalsState === 'future' &&
                <RentalsFuture/>
            }
        </>
    );
}

export default DetailsModal
