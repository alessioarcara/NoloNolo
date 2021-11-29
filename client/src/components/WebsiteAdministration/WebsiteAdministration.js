import classes from './WebsiteAdministration.module.css';
import Header from "../UI/Header/Header";

const WebsiteAdministration = () => {
    const exitButtonElement = <button className={`${classes['exit-btn']} btn btn-primary`}>Esci</button>

    return (
        <div className={classes['administration-container']}>
            {/* Administration Header */}
            <Header
                textTitle="Amministrazione"
                optionsElement={exitButtonElement}
                classNameHeader={classes['header-background']}
            />

            {/* Administation Rentals Card */}
            <div className={classes['administration-card']}>

            </div>
        </div>
    )
}

export default WebsiteAdministration