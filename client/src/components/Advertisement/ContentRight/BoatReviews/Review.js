import classes from './Review.module.css';
import ReadMoreText from "../../../UI/ReadMoreText/ReadMoreText";
import {formatDayMonthYearDate, getImagePath} from "../../../../helpers/Utils/utils";
import {DEFAULT_AVATAR} from "../../../../helpers/Utils/constants";

const Review = ({avatar, creator, createdAt, body}) => {
    return (
        <div className={classes['card-container']}>
            <div className={classes['user-info-container']}>
                <div className={classes['avatar-container']}>
                    <img
                        className={classes.avatar}
                        src={avatar ? getImagePath(avatar) : DEFAULT_AVATAR}
                        onError={event => event.target.src = DEFAULT_AVATAR}
                        alt="foto profilo"
                    />
                </div>
                <div className={classes['user-container']}>
                    <div className={classes['name']}>{creator}</div>
                    <div className={classes.data}>{formatDayMonthYearDate(+createdAt, {month: 'long', year: 'numeric'})}</div>
                </div>
            </div>
            <ReadMoreText
                text={body}
            />
        </div>
    );
}

export default Review;
