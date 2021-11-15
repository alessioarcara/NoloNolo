import RentalCard from "../RentalCard/RentalCard";
import {useCallback} from "react";
import ElementsNotFound from "../../UI/ElementsNotFound/ElementsNotFound";
import BoatListLayout from "../../UI/Layout/BoatListLayout/BoatListLayout";

const RentalList = ({previousRentals, activeRentals, futureRentals, previous, active, future}) => {
    let content
    const openedRentals = useCallback(() => {
        return previousRentals || activeRentals || futureRentals
    }, [previousRentals, activeRentals, futureRentals])

    const emptyName = () => {
        return previous ? 'passati' : active ? 'attivi' : future ? 'futuri' : ''
    }

    if (openedRentals().length === 0) {
        content =
            <ElementsNotFound
                warningText={`Non ci sono noleggi ${emptyName()}. Inizia a noleggiare! '&hearts;'`}
                warningTextButton="Noleggia"
                path="/"
            />
    } else {
        content =
            <BoatListLayout>
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
                        images={rental.boat.hasAdvertisement.images}
                    />
                ))}
            </BoatListLayout>
    }

    return (
        <>
            {content}
        </>
    );
};

export default RentalList;
