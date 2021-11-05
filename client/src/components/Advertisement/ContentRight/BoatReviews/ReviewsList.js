import Review from "./Review";
import classes from './ReviewsList.module.css';

const ReviewsList = ({reviews}) => {
    return (
        <div className={classes['reviews-container']}>
            {reviews.length > 0 && reviews.map(review => (
                <Review
                    key={review._id}
                    avatar={review.avatar}
                    creator={review.creator.email}
                    createdAt={review.createdAt}
                    // body={review.body}
                    body={'Credo che questa barca sia molto comoda. Dopo averla noleggiata nel periodo estivo ho notato tutte le caratteristiche perfette e raffinate che potesse avere. Sono rimasto davvero soddisfatto dal modo in cui il tutto è stato preparato e selezionato '}
                />
            ))}
        </div>
    );
}

export default ReviewsList;