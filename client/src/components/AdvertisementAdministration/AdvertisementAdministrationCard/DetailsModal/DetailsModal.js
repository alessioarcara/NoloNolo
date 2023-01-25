import {useState} from "react";
import DetailsModalHeader from "./DetailsModalHeader/DetailsModalHeader";
import PreviousRentals from "../PreviousRentals/PreviousRentals";
import ActiveRental from "../ActiveRental/ActiveRental";
import FutureRentals from "../FutureRentals/FutureRentals";

const DetailsModal = ({previousRentals, activeRental, futureRentals, onMutateAdvertisement}) => {
    const [rentalsState, setRentalsState] = useState("active")

    return (
        <>
            <DetailsModalHeader rentalsState={rentalsState} setRentals={setRentalsState}/>
            {rentalsState === 'previous' &&
                <PreviousRentals previousRentals={previousRentals}/>
            }
            {rentalsState === 'active' &&
                <ActiveRental activeRental={activeRental[0]} onMutateAdvertisement={onMutateAdvertisement}/>
            }
            {rentalsState === 'future' &&
                <FutureRentals futureRentals={futureRentals}/>
            }
        </>
    );
}

export default DetailsModal
