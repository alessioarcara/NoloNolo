import classes from './WebsiteAdministration.module.css';
import Header from "../UI/Header/Header";
import AdministrationRentalList from "./AdministrationRentalList";

const WebsiteAdministration = ({rentals, handleMutationAdministrationRentals, logout}) => {
    const exitButtonElement = <button className={`${classes['exit-btn']} btn btn-primary`}>Esci</button>
    const filteredFutureRentals = () => rentals.filter(rental => new Date(rental.from) > new Date())

    return (
        <div className={classes['administration-container']}>
            {/* Administration Header */}
            <Header
                textTitle="Amministrazione"
                optionsElement={exitButtonElement}
                handleOptionsElement={logout}
                classNameHeader={classes['header-background']}
            />

            {/* Administation Rentals Card */}
            <div className={classes['administration-card']}>
                <Header textTitle="Noleggi futuri"
                        classNameHeader={classes["rentals-list-title"]}
                        classNameTitle={classes["header-title"]}/>
                <div className={classes["rentals-container"]}>
                    <AdministrationRentalList
                        rentals={filteredFutureRentals()}
                        handleMutationAdministrationRentals={handleMutationAdministrationRentals}
                    />
                </div>
            </div>
        </div>
    )
}

export default WebsiteAdministration
