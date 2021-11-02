import React, {useState, useCallback, useContext} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import {useStore} from "../../hooks-store/store";
import AuthContext from "../../store/auth-context";
import {Link, useHistory, useLocation} from "react-router-dom";
import {formatNumber} from "../../helpers/utils";

const Boat = ({ id, images, model, description, maxCapacity, dailyFee, reviews, advIsFavorite}) => {
    const [isFavorite, setIsFavorite] = useState(advIsFavorite);
    const {isLoggedIn} = useContext(AuthContext)
    const history = useHistory()
    const location = useLocation()

    const averageReviews = useCallback(
        () => reviews.reduce((sum, { rating }) => sum + rating, 0 ) / reviews.length,
        [reviews]);

    const dispatch = useStore()[1]

    const toggleFavoritesStatusHandler = () => {
        dispatch(
            'TOGGLE_FAV',
            { _id: id, hasAdvertisement: { images, description, dailyFee, reviews}, model, advIsFavorite: true }
        )
        setIsFavorite(prevState => !prevState)
    }

    const goAdvertisementPage = useCallback((pathname) => {
        history.push(`${pathname}/${id}`)
    }, [history, id])

    return (
        <>
            <div className={classes.card}>
                {/* The first part with images */}
                <SlideShow images={images}>
                    <>
                        {isLoggedIn &&
                        <div onClick={toggleFavoritesStatusHandler}
                             className={isFavorite ? `${classes.icon} ${classes.clicked}` : classes.icon}>
                            <HeartIcon className={classes.heart}/>
                        </div>
                        }
                        {/* price in mobile phone */}
                        <div className={`${classes['price-mobile-phone']} ${classes['text-style']}`}>
                            Da {formatNumber(dailyFee)}
                        </div>
                    </>
                </SlideShow>
                {/* The second part with information */}
                <div className={classes.adapter} onClick={() => goAdvertisementPage(location.pathname)}>
                    <div className={classes.model}>{model}</div>
                    <div className={`${classes.capacity} ${classes['text-style']}`}>Fino a {maxCapacity} passeggeri</div>
                    <div className={`${classes.price} ${classes['text-style']}`}>{`Da ${formatNumber(dailyFee)} /al giorno`}</div>
                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{reviews.length > 0 ? averageReviews().toFixed(1) : '0.0'}</span>
                        <span>({reviews.length})</span>
                    </div>
                    {/*<div className={classes['btn-details']}>*/}
                        <Link to={`${location.pathname}/${id}`}>
                            <button className={`btn btn-primary ${classes['btn-details']}`}>Dettagli</button>
                        </Link>
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
};

export default Boat;
