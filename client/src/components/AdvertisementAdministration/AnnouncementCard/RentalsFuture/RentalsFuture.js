import RentalsFutureCard from "./RentalsFutureCard/RentalsFutureCard";
import {calculateTotal} from "../../../../helpers/Utils/utils";

const RentalsFuture = ({futureRentals}) => {
    return (
        futureRentals.map(rental =>
            <RentalsFutureCard
                key={rental._id}
                customer={rental.customer}
                createdAt={rental.createdAt}
                start={rental.from}
                end={rental.to}
                totalAmount={calculateTotal(rental.dailyFee, rental.fixedFee, rental.from, rental.to)}
            />
        )
    );
}

export default RentalsFuture
