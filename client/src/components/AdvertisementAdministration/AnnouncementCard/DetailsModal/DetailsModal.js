import {useState} from "react";
import DetailsModalHeader from "./DetailsModalHeader/DetailsModalHeader";
import RentalsPrevious from "../RentalsPrevious/RentalsPrevious";
import RentalActive from "../RentalActive/RentalActive";
import RentalsFuture from "../RentalsFuture/RentalsFuture";

const DetailsModal = ({previousRentals, activeRental, futureRentals}) => {
    const [rentalsState, setRentalsState] = useState("active")

    return (
        <>
            <DetailsModalHeader rentalsState={rentalsState} setRentals={setRentalsState}/>
            {rentalsState === 'previous' &&
                <RentalsPrevious previousRentals={previousRentals}/>
            }
            {rentalsState === 'active' &&
                <RentalActive activeRental={activeRental[0]}/>
            }
            {rentalsState === 'future' &&
                <RentalsFuture futureRentals={futureRentals}/>
            }
        </>
    );
}

export default DetailsModal
