import classes from "./RentalRow.module.css";
import StarIcon from "../../../UI/icons/StarIcon";
import Button from "../../../UI/Button/Button";

const RentalRow = ({start, end, customer, totalAmount}) => {

    return (
        <div className={classes['row-layout']}>
            <div className={classes['inline-rental']}>
                <div className={classes.date}>
                    <div>{start}</div>
                    <div>-{end}</div>
                </div>
                <div>{customer}</div>
                <div className={classes.stars}>
                    <div className={classes.star}><StarIcon/></div>
                    <div className={classes.star}><StarIcon/></div>
                    <div className={classes.star}><StarIcon/></div>
                    <div className={classes.star}><StarIcon/></div>
                    <div className={classes.star}><StarIcon/></div>
                </div>
                <div>{totalAmount}</div>
            </div>
            <div className={classes['bill-button']}>
                <Button className='btn btn-primary'>Visualizza fattura</Button>
            </div>
        </div>
    )
}

export default RentalRow;