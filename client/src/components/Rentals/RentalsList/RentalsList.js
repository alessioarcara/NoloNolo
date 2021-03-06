import React from "react";
import RentalCard from "../RentalCard/RentalCard";
import {useCallback, useMemo} from "react";
import ElementsNotFound from "../../UI/ElementsNotFound/ElementsNotFound";
import BoatListLayout from "../../UI/Layout/BoatListLayout/BoatListLayout";
import {calculateTotal} from "../../../helpers/Utils/utils";
import Spacer from "../../UI/Spacer/Spacer";

const RentalsList = ({
                        onMutateRentals,
                        previousRentals,
                        activeRentals,
                        futureRentals,
                        previous,
                        active,
                        future
                    }) => {
    let content;
    const openedRentals = useCallback(() => {
        return previousRentals || activeRentals || futureRentals
    }, [previousRentals, activeRentals, futureRentals])

    const emptyName = useMemo(() => {
        return previous ? 'passati' : active ? 'attivi' : future ? 'futuri' : ''
    }, [previous, active, future])

    if (openedRentals().length === 0) {
        content =
            <ElementsNotFound
                warningText={`Non ci sono noleggi ${emptyName}. Inizia a noleggiare la tua barca!`}
                warningTextButton="Noleggia"
                path="/"
            />
    } else {
        content =
            <>
                <BoatListLayout>
                    {openedRentals().map(rental =>
                        <RentalCard
                            onMutateRentals={onMutateRentals}
                            key={rental._id}
                            rentalId={rental._id}
                            boatId={rental.boat._id}
                            previous={previous}
                            active={active}
                            future={future}
                            from={rental.from}
                            to={rental.to}
                            redeliveryDate={rental.redelivery}
                            city={rental.boat.isDocked.city}
                            totalAmount={
                                calculateTotal(rental.dailyFee, rental.fixedFee, rental.from, rental.to, rental.redelivery)
                            }
                            images={rental.boat.hasAdvertisement ? rental.boat.hasAdvertisement.images : []}
                            billNumber={rental.billNumber}
                            boatData={rental.boat}
                            customer={rental.customer}
                            createdAt={rental.createdAt}
                            rentalDailyFee={rental.dailyFee}
                            rentalFixedFee={rental.fixedFee}
                            advertisementDailyFee={rental.boat.hasAdvertisement ? rental.boat.hasAdvertisement.dailyFee : 0}
                            advertisementFixedFee={rental.boat.hasAdvertisement ? rental.boat.hasAdvertisement.fixedFee : 0}
                            review={rental.boat.reviews.filter
                                (review => review.rental === rental._id && review.creator._id === rental.customer._id)[0]
                            }
                            isReviewed={rental.isReviewed}
                        />
                    )}
                </BoatListLayout>
                <Spacer heightVh={5}/>
            </>
    }

    return content
};

export default React.memo(RentalsList);
