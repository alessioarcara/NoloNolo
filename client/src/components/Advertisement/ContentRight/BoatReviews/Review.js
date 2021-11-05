import classes from './Review.module.css';
import ReadMoreText from "../../../UI/ReadMoreText/ReadMoreText";
import {formatLongMonthYearDate} from "../../../../helpers/utils";

const Review = ({avatar, creator, createdAt, body}) => {
    return (
        <div className={classes['card-container']}>
            <div className={classes['user-info-container']}>
                <div className={classes['avatar-container']}>
                    <img
                        className={classes.avatar}
                        // src={avatar}
                        src={'https://www.breezelife.it/img/sezioni/mobile/breeze_men.jpg'}
                        alt={''}
                    />
                </div>
                <div className={classes['user-container']}>
                    <div className={classes['name']}>{creator}</div>
                    <div className={classes.data}>{formatLongMonthYearDate(+createdAt)}</div>
                </div>
            </div>
            <ReadMoreText
                text={body}
            />
        </div>
    );
}

export default Review;