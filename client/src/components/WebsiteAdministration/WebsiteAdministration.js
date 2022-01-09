import classes from './WebsiteAdministration.module.css';
import Header from "../UI/Header/Header";
import AdministrationRentalList from "./AdministrationRentalList";
import Button from "../UI/Button/Button";
import {useMemo} from "react";

const WebsiteAdministration = ({rentals, handleMutationAdministrationRentals, logout}) => {
    const filteredFutureRentals = useMemo(
        () => rentals.filter(rental => new Date(rental.from) > new Date()),
        [rentals])

    return (
        <div className={classes['administration-container']}>

            {/* Administration Header */}
            <Header
                textTitle="Amministrazione"
                classNameHeader={classes['header-background']}
                classNameTitle={classes['administration-title']}
            />

            <section className={classes.container}>
                {/* Administration Rentals Card */}
                <div className={classes['administration-card']}>
                    <Header textTitle="Noleggi futuri"
                            classNameHeader={classes["rentals-list-title"]}
                            classNameTitle={classes["rentals-title"]}/>
                    <AdministrationRentalList
                        rentals={filteredFutureRentals}
                        handleMutationAdministrationRentals={handleMutationAdministrationRentals}
                    />
                </div>

                {/* Exit Button */}
                <div className={classes['exit-btn']}>
                    <Button onClick={logout} type="button">Esci</Button>
                </div>
            </section>

        </div>
    )
}

export default WebsiteAdministration
