import RentalPreviousCard from "./RentalPreviousCard/RentalPreviousCard";
import {calculateTotal, dateSorting} from "../../../../helpers/Utils/utils";

const RentalsPrevious = ({previousRentals}) => {
    const data = dateSorting(previousRentals, true)

    return (
        data.map(previous =>
            <RentalPreviousCard
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

export default RentalsPrevious
