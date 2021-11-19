import {useState} from "react";
import DetailsModalHeader from "./DetailsModalHeader/DetailsModalHeader";
import RentalsPrevious from "../RentalsPrevious/RentalsPrevious";
import RentalActive from "../RentalActive/RentalActive";

const DetailsModal = ({start, end, customer, totalAmount}) => {
    const [rentalsState, setRentalsState] = useState("active")

    // TO DO: passare i dati come props oppure fare una fetch qui passando rentalId ?

    return (
        <>
            <DetailsModalHeader rentalsState={rentalsState} setRentals={setRentalsState}/>
            {rentalsState === 'previous' &&
                <RentalsPrevious
                    start={start}
                    end={end}
                    customer={customer}
                    totalAmount={totalAmount}
                />
            }
            {rentalsState === 'active' &&
                <RentalActive/>
            }
        </>
    );
}

export default DetailsModal