import classes from "./ReviewModal.module.css";
import {useCallback, useState} from "react";
import Vote from "../../../UI/Vote/Vote";
import {body_publishReview} from "../../../../helpers/httpConfig";
import {formatDayMonthYearDate} from "../../../../helpers/Utils/utils";


const votes = ['Scadente', 'Non buono', 'Buono', 'Ottimo', 'Eccellente']

const ReviewModal = ({rentalId, review, isReviewed, onPublishReview}) => {
    const [quoteIndex, setQuoteIndex] = useState()
    const [textArea, setTextArea] = useState('')

    const changeQuoteIndex = useCallback(index => setQuoteIndex(index), [])
    const changeTextHandler = useCallback(event => setTextArea(event.target.value), [])

    const submitFormHandler = evt => {
        evt.preventDefault()
        onPublishReview(
            body_publishReview({
                rentalId,
                body: textArea,
                rating: parseInt(quoteIndex) + 1
            }),
            (prevRentals, newReview) => prevRentals.map(userRental => userRental._id === newReview.rental ? {
                    ...userRental,
                    boat: {
                        ...userRental.boat,
                        reviews: userRental.boat.reviews.concat(newReview)
                    }
                } : userRental
            )
        )
    }

    return (
        <form onSubmit={submitFormHandler}>
            <div className={classes['review-container']}>
                <span className={classes[`review-title`]}>
                    {isReviewed ? "La tua recensione" : "Scrivi la tua recensione!"}
                </span>
                <div className={classes[`five-stars`]}>
                    <span className={classes.quote}>
                        {isReviewed
                            ? `Valutata: ${votes[review.rating - 1]}`
                            : votes[quoteIndex]
                                ? votes[quoteIndex]
                                : 'Valuta questa barca'
                        }
                    </span>
                    <div className={classes.stars}>
                        <Vote
                            votes={votes}
                            quoteIndex={isReviewed ? review.rating - 1 : quoteIndex}
                            changeQuoteIndex={changeQuoteIndex}
                            placeholder={isReviewed}
                        />
                    </div>
                </div>
                <div className={classes['review-text-container']}>
                    <span>
                        {isReviewed ? "Il tuo feedback:" : "Lasciaci il tuo feedback:"}
                    </span>
                    <textarea
                        className={classes['review-text']}
                        onChange={changeTextHandler}
                        value={isReviewed ? review.body : textArea}
                        disabled={isReviewed}
                    />
                </div>
                <div className={`${isReviewed ? classes['created-at-container'] : "hide"}`}>
                    <span>Lasciata il {isReviewed &&
                        formatDayMonthYearDate(new Date(+review.createdAt),
                            {day: 'numeric', month: 'long', year: 'numeric'})}
                    </span>
                </div>
                <button
                    className={`${classes['btn-publish']} btn btn-outline-primary ${isReviewed && "hide"}`}
                    disabled={!quoteIndex || textArea.length < 10}
                >
                    Pubblica
                </button>
            </div>
        </form>
    );
};

export default ReviewModal;
