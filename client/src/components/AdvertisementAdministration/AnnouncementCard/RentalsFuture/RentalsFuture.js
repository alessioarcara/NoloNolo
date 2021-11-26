import RentalsFutureCard from "./RentalsFutureCard/RentalsFutureCard";
import {calculateTotal} from "../../../../helpers/Utils/utils";

const futureRentals = [
    {
        id: '01',
        customer: 'giovanni.rossi@test.it',
        createdAt: new Date("2021-10-10"),
        start: new Date("2021-10-20"),
        end: new Date("2021-10-25"),
        totalAmount: 1200
    },
    {
        id: '02',
        customer: 'giovanni.verdi@test.it',
        createdAt: new Date("2021-11-8"),
        start: new Date("2021-11-15"),
        end: new Date("2021-11-30"),
        totalAmount: 2500
    }
]

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
