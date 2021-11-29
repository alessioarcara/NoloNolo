import PreviousRentalCard from "./PreviousRentalCard/PreviousRentalCard";
import {calculateTotal, dateSorting} from "../../../../helpers/Utils/utils";
import {useMemo} from "react";
import ElementsNotFound from "../../../UI/ElementsNotFound/ElementsNotFound";

const PreviousRentals = ({previousRentals}) => {
    let content;
    const previousData = useMemo(() =>
            dateSorting(previousRentals, true),
        [previousRentals])

    {
        previousData.length > 0
            ? content = previousData.map(previous =>
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
                    redeliveryDate={previous.redelivery}
                    totalAmount={calculateTotal(previous.dailyFee, previous.fixedFee, previous.from, previous.to, previous.redelivery)}
                    review={previous.boat.reviews.filter(review =>
                        previous._id === review.rental && review.creator._id === previous.customer._id)[0]}
                />
            )
            : content = <ElementsNotFound warningText="Non ci sono noleggi passati..." hasBackdrop={false}/>
    }

    return (
        <>
            {content}
        </>
    )
}

export default PreviousRentals
