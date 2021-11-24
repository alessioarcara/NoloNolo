import RentalPreviousCard from "./RentalPreviousCard/RentalPreviousCard";
import {dateSorting} from "../../../../helpers/utils";

const previousRentals = [
    {
        id: "01",
        start: new Date('2021-11-3'),
        end: new Date("2021-11-8"),
        customer: 'mario.verdi@test.it'
    },
    {
        id: "02",
        start: new Date('2021-10-10'),
        end: new Date("2021-10-15"),
        customer: 'mario.rossi@test.it'
    },
    {
        id: "03",
        start: new Date('2021-11-18'),
        end: new Date("2021-11-19"),
        customer: 'mario.arancioni@test.it'
    }
]

const RentalsPrevious = () => {

    // TO DO: add data request (server)
    dateSorting(previousRentals, true)

    return (
        previousRentals.map(previous =>
            <RentalPreviousCard
                key={previous.id}
                start={previous.start}
                end={previous.end}
                customer={previous.customer}
            />
        )
    )
}

export default RentalsPrevious