import RentalPreviousCard from "./RentalPreviousCard/RentalPreviousCard";
import {dateSorting} from "../../../../helpers/utils";

const RentalsPrevious = ({previousRentals}) => {
    const data = dateSorting(previousRentals, true)

    return (
        previousRentals.map(previous =>
            <RentalPreviousCard
                key={previous._id}
                start={previous.from}
                end={previous.to}
                customer={previous.customer}
                review={previous.boat.reviews.filter(review =>
                    previous._id === review.rental && review.creator._id === previous.customer._id)[0]}
            />
        )
    )
}

export default RentalsPrevious