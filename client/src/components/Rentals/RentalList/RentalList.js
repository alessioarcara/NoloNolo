import RentalCard from "../RentalCard/RentalCard";
import {useCallback, useMemo} from "react";
import ElementsNotFound from "../../UI/ElementsNotFound/ElementsNotFound";
import BoatListLayout from "../../UI/Layout/BoatListLayout/BoatListLayout";

const RentalList = ({
                        onUpdateOrDeleteRentals,
                        previousRentals,
                        activeRentals,
                        futureRentals,
                        previous,
                        active,
                        future
                    }) => {
    let content
    const openedRentals = useCallback(() => {
        return previousRentals || activeRentals || futureRentals
    }, [previousRentals, activeRentals, futureRentals])

    const emptyName = useMemo(() => {
        return previous ? 'passati' : active ? 'attivi' : future ? 'futuri' : ''
    }, [previous, active, future])

    console.log(previousRentals)

    if (openedRentals().length === 0) {
        content =
            <ElementsNotFound
                warningText={`Non ci sono noleggi ${emptyName}. Inizia a noleggiare la tua barca!`}
                warningTextButton="Noleggia"
                path="/"
            />
    } else {
        content =
            <BoatListLayout>
                {openedRentals().map(rental =>
                    <RentalCard
                        onUpdateOrDeleteRentals={onUpdateOrDeleteRentals}
                        key={rental._id}
                        rentalId={rental._id}
                        boatId={rental.boat._id}
                        previous={previous}
                        active={active}
                        future={future}
                        from={rental.from}
                        to={rental.to}
                        city={rental.boat.isDocked.city}
                        totalAmount={rental.totalAmount}
                        images={rental.boat.hasAdvertisement.images}
                        billNumber={rental.billNumber}
                        boatData={rental.boat}
                        customer={rental.customer}
                        createdAt={rental.createdAt}
                        dailyFee={rental.boat.hasAdvertisement.dailyFee}
                        fixedFee={rental.boat.hasAdvertisement.fixedFee}
                        reviews={rental.boat.hasAdvertisement.reviews}
                        isReviewed={rental.isReviewed}
                    />
                )}
            </BoatListLayout>
    }

    return (
        <>
            {content}
        </>
    );
};

export default RentalList;
