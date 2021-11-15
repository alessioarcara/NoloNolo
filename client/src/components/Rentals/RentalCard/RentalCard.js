import SlideShow from "../../UI/SlideShow/SlideShow";
import classes from './RentalCard.module.css';
import {formatDayMonthYearDate, formatNumber} from "../../../helpers/utils";


const RentalCard = ({
                        previous,
                        active,
                        future,
                        from,
                        to,
                        city,
                        totalAmount
                    }) => {
    return (
        <div className={classes['card-container']}>
            <span className={`${classes[`delete-card`]} ${!future && classes.hide}`}>&times;</span>
            {/*First element*/}
            {/*<SlideShow images={images}/>*/}
            <div className={classes['details-container']}>
                {/*Second element*/}
                <section className={classes['details-section']}>
                        <span className={classes.dates}>
                            {`${formatDayMonthYearDate(new Date(from), {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })} - ${formatDayMonthYearDate(new Date(to), {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}`}
                        </span>
                    <span className="card-title">{city}</span>
                    <span className={classes.price}>{`Prezzo totale ${formatNumber(totalAmount)}`}</span>
                </section>
                {/*Third element (optional)*/}
                <section className={`${classes['optional-section']} ${active && classes.hide}`}>
                    <span className={`${classes.option} ${!future && classes.hide}`}>Modifica date</span>
                    <span className={`${classes.option} ${!previous && classes.hide}`}>Mostra fattura</span>
                    <span className={`${classes.option} ${!previous && classes.hide}`}>Lascia recensione</span>
                </section>
            </div>
        </div>
    );
};

export default RentalCard