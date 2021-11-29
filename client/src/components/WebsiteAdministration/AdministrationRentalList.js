import AdministrationRental from "./Rental/AdministrationRental";

const AdministrationRentalList = ({handleMutationAdministrationRentals, rentals}) => {
    return (
        <>
            {rentals && rentals.map(rental =>
                <AdministrationRental
                    key={rental._id}
                    rentalId={rental._id}
                    handleMutationAdministrationRentals={handleMutationAdministrationRentals}
                    customer={rental.customer.email}
                    from={rental.from}
                    to={rental.to}
                />
            )}
        </>
    );
}

export default AdministrationRentalList;