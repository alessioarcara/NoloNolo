import React, {useCallback} from "react"
import classes from './Boat.module.css';
import StarIcon from "../UI/icons/StarIcon";
import SlideShow from "../UI/SlideShow/SlideShow";
import Favorite from "../Favorite/Favorite";
import {useNavigate, useSearchParams} from "react-router-dom";
import {averageReviews, formatNumber} from "../../helpers/Utils/utils";

const Boat = ({id, images, model, dailyFee, reviews, maxCapacity, advIsFavorite}) => {
    const navigate = useNavigate()
    const searchParams = useSearchParams()[0]

    const goAdvertisementPage = useCallback(() => {
        navigate(
            `/boats/${id}`,
            {state: {startUrlDate: searchParams.get('from'), endUrlDate: searchParams.get('to')}}
        )
    }, [navigate, id, searchParams])

    return (
        <>
            <div className={classes.card}>
                {/* The first part with images */}
                <SlideShow images={images}>
                    <Favorite boatId={id} advIsFavorite={advIsFavorite}/>
                    {/* price in mobile phone */}
                    <div className={`${classes['price-mobile-phone']} ${classes['text-style']}`}>
                        Da {formatNumber(dailyFee)}
                    </div>
                </SlideShow>
                {/* The second part with information */}
                <div className={classes.adapter}
                     onClick={goAdvertisementPage}>
                    <div className='card-title'>{model}</div>
                    <div className={`${classes.capacity} ${classes['text-style']}`}>Fino a {maxCapacity} passeggeri
                    </div>
                    <div
                        className={`${classes.price} ${classes['text-style']}`}>{`Da ${formatNumber(dailyFee)} /al giorno`}</div>
                    <div className={classes.info}>
                        <StarIcon/>
                        <span>{reviews.length > 0 ? averageReviews(reviews).toFixed(1) : '0.0'}</span>
                        <span>({reviews.length})</span>
                    </div>
                    {/* Button in desktop */}
                    <button
                        className={`btn btn-primary ${classes['btn-details']}`}
                        onClick={e => {
                            e.stopPropagation()
                            goAdvertisementPage()
                        }}
                    >
                        Dettagli
                    </button>
                </div>
            </div>
        </>
    );
};

export default React.memo(Boat);
