import RentalCard from "../RentalCard/RentalCard";
import {useCallback} from "react";

const RentalList = ({previousRentals, activeRentals, futureRentals, previous, active, future}) => {

    const openedRentals = useCallback(() => {
        return previousRentals || activeRentals || futureRentals
    }, [previousRentals, activeRentals, futureRentals])

    const isActive = () => {
        return previous ? 'Passato'
            : active ? 'Attivo'
            : future ? 'Futuro' : ''
    }

    return (
        <>
            {openedRentals().length === 0 && <h1>{isActive()}</h1>}
            {openedRentals().map(rental => (
                <RentalCard
                    key={rental._id}
                    previous={previous}
                    active={active}
                    future={future}
                    from={rental.from}
                    to={rental.to}
                    city={rental.boat.isDocked.city}
                    totalAmount={rental.totalAmount}
                />
            ))}
        </>
    );
};

export default RentalList;