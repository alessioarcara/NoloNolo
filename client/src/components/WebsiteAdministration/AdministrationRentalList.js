import AdministrationRental from "./Rental/AdministrationRental";
import ElementsNotFound from "../UI/ElementsNotFound/ElementsNotFound";

const AdministrationRentalList = ({handleMutationAdministrationRentals, rentals}) => {
    let content;

    {rentals.length > 0
        ?   content = rentals.map(rental =>
                <AdministrationRental
                    key={rental._id}
                    rentalId={rental._id}
                    boatId={rental.boat._id}
                    handleMutationAdministrationRentals={handleMutationAdministrationRentals}
                    customer={rental.customer.email}
                    from={rental.from}
                    to={rental.to}
                    city={rental.boat.isDocked.city}
                />
            )
        : content = <ElementsNotFound warningText="Non ci sono noleggi futuri presenti!" hasBackdrop={false}/>
    }
    return (
        <>
            {content}
        </>
    );
}

export default AdministrationRentalList;