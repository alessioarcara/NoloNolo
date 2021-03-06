import FutureRentalCard from "./FutureRentalCard/FutureRentalCard";
import {calculateTotal, dateSorting} from "../../../../helpers/Utils/utils";
import {useMemo} from "react";
import ElementsNotFound from "../../../UI/ElementsNotFound/ElementsNotFound";

const FutureRentals = ({futureRentals}) => {
    const futureData = useMemo(() =>
            dateSorting(futureRentals, true),
        [futureRentals])

    let content;
    if (futureData.length > 0) {
        content = futureData.map(rental =>
            <FutureRentalCard
                key={rental._id}
                customer={rental.customer}
                createdAt={rental.createdAt}
                start={rental.from}
                end={rental.to}
                totalAmount={calculateTotal(rental.dailyFee, rental.fixedFee, rental.from, rental.to)}
            />
        )
    } else {
        content = <ElementsNotFound warningText="Non ci sono noleggi futuri..." hasBackdrop={false}/>
    }

    return content;
}

export default FutureRentals
