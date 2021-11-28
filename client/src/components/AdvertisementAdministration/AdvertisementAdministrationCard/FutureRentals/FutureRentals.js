import FutureRentalCard from "./FutureRentalCard/FutureRentalCard";
import {calculateTotal, dateSorting} from "../../../../helpers/Utils/utils";
import {useMemo} from "react";

const FutureRentals = ({futureRentals}) => {
    const futureData = useMemo(() =>
        dateSorting(futureRentals, true),
        [futureRentals])

    return (
        futureData.map(rental =>
            <FutureRentalCard
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

export default FutureRentals
