import classes from './DetailsModalHeader.module.css'

const DetailsModalHeader = ({rentalsState, setRentals}) => {
    return (
        <div className={classes['modal-header-container']}>
            <div className={classes['header-container']}>
                <div
                    className={`${classes['state-item']} ${rentalsState === "previous" && classes['active']}`}
                    onClick={() => setRentals("previous")}
                >
                    Passati
                </div>
                <div
                    className={`${classes['state-item']} ${rentalsState === "active" && classes['active']}`}
                    onClick={() => setRentals("active")}
                >
                    Attivo
                </div>
                <div
                    className={`${classes['state-item']} ${rentalsState === "future" && classes['active']}`}
                    onClick={() => setRentals("future")}
                >
                    Futuri
                </div>
            </div>
        </div>
    );
}

export default DetailsModalHeader