import React, {useState, useCallback, useContext} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import HeartIcon from "../UI/icons/MenuIcons/HeartIcon";
import {useStore} from "../../hooks-store/store";
import AuthContext from "../../store/auth-context";
import {useHistory, useLocation} from "react-router-dom";
import {averageReviews, formatNumber} from "../../helpers/utils";

const Boat = ({ id, images, model, description, maxCapacity, dailyFee, reviews, advIsFavorite}) => {
    const [isFavorite, setIsFavorite] = useState(advIsFavorite);
    const {isLoggedIn} = useContext(AuthContext)
    const history = useHistory()

    // TODO: in react-router v6 use useSearchParams
    const search = useLocation().search

    const dispatch = useStore()[1]

    const toggleFavoritesStatusHandler = () => {
        dispatch(
            'TOGGLE_FAV',
            { _id: id, hasAdvertisement: { images, description, dailyFee, reviews}, model, advIsFavorite: true }
        )
        setIsFavorite(prevState => !prevState)
    }

    const goAdvertisementPage = useCallback((start, end) => {
        history.push({pathname: `/boats/${id}`, state: {startUrlDate: start, endUrlDate: end}})
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
                <div className={classes.adapter} onClick={goAdvertisementPage.bind(this, new URLSearchParams(search).get('from'), new URLSearchParams(search).get('to'))}>
                    <div className={classes.model}>{model}</div>
                    <div className={`${classes.capacity} ${classes['text-style']}`}>Fino a {maxCapacity} passeggeri</div>
                    <div className={`${classes.price} ${classes['text-style']}`}>{`Da ${formatNumber(dailyFee)} /al giorno`}</div>
                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{reviews.length > 0 ? averageReviews(reviews).toFixed(1) : '0.0'}</span>
                        <span>({reviews.length})</span>
                    </div>
                    {/* Button in desktop */}
                    <button
                        className={`btn btn-primary ${classes['btn-details']}`}
                        onClick={goAdvertisementPage.bind(this, new URLSearchParams(search).get('from'), new URLSearchParams(search).get('to'))}
                    >
                        Dettagli
                    </button>
                </div>
            </div>
        </>
    );
};

export default Boat;
