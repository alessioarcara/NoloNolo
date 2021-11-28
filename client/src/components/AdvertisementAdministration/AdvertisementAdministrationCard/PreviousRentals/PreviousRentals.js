import PreviousRentalCard from "./PreviousRentalCard/PreviousRentalCard";
import {calculateTotal, dateSorting} from "../../../../helpers/Utils/utils";
import {useMemo} from "react";

const PreviousRentals = ({previousRentals}) => {
    const previousData = useMemo(() =>
            dateSorting(previousRentals, true),
        [previousRentals])

    return (
        previousData.map(previous =>
            <PreviousRentalCard
                key={previous._id}
                start={previous.from}
                end={previous.to}
                customer={previous.customer}
                billNumber={previous.billNumber}
                boatData={previous.boat}
                createdAt={previous.createdAt}
                dailyFee={previous.dailyFee}
                fixedFee={previous.fixedFee}
                totalAmount={calculateTotal(previous.dailyFee, previous.fixedFee, previous.from, previous.to)}
                review={previous.boat.reviews.filter(review =>
                    previous._id === review.rental && review.creator._id === previous.customer._id)[0]}
            />
        )
    )
}

export default PreviousRentals
