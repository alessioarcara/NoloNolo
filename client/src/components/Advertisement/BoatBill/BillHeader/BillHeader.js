import classes from './BillHeader.module.css';
import ShipyardIcon from "../../../UI/icons/ShipyardIcon";

const BillHeader = ({shipowner, city, region, harbour}) => {
    return (
        <div className={classes['header-container']}>
            {/* Content left */}
            <div className={classes['shipowner-container']}>
                <div className={classes['shipowner']}>
                    <span>{shipowner}</span>
                </div>
                <div className={classes['place']}>
                    <span>{`${city},`}</span>
                    <span>{region}</span>
                </div>
                <span>{harbour}</span>
            </div>
            {/* Content right */}
            <ShipyardIcon/>
        </div>
    );
}

export default BillHeader