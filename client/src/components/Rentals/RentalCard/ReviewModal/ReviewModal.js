import classes from "./ReviewModal.module.css";
import {useCallback, useState} from "react";
import Vote from "../../../UI/Vote/Vote";
import {body_publishReview} from "../../../../helpers/httpConfig";

const ReviewModal = ({rentalId, customerId, reviews, isReview, onPublishReview}) => {
    const votes = ['Scadente', 'Non buono', 'Buono', 'Ottimo', 'Eccellente']
    const [quoteIndex, setQuoteIndex] = useState()
    const [textArea, setTextArea] = useState('')

    const changeQuoteIndex = useCallback((index) => {
        setQuoteIndex(index)
    }, [setQuoteIndex])

    const changeTextHandler = (event) => {
        setTextArea(event.target.value)
    }

    const submitFormHandler = (evt) => {
        evt.preventDefault()

        onPublishReview(
            body_publishReview({
                rentalId: rentalId.toString(),
                body: textArea.toString(),
                rating: parseInt(quoteIndex) + 1
            }),
            (prevRentals, newRental) =>
                prevRentals.map(userRental => userRental._id === newRental._id ? newRental : userRental)
        )
    }

    const filterReview = () => reviews.filter(review => review.creator._id === customerId)

    return (
        <>
            <div className={classes['review-container']}>
                <span className={classes[`review-title`]}>
                    {isReview
                        ? "La tua recensione"
                        : "Scrivi la tua recensione!"
                    }
                </span>
                <div className={classes[`five-stars`]}>
                    <span className={classes.quote}>
                        {isReview
                            ? votes[filterReview()[0].rating - 1]
                            : votes[quoteIndex]
                                ? votes[quoteIndex]
                                : 'Valuta questa barca'}
                    </span>
                    <div className={classes.stars}>
                        <Vote
                            votes={votes}
                            quoteIndex={isReview ? filterReview()[0].rating - 1 : quoteIndex}
                            changeQuoteIndex={changeQuoteIndex}
                            placeholder={isReview}
                        />
                    </div>
                </div>
                <div className={classes['review-text-container']}>
                    <span>Lasciaci il tuo feedback:</span>
                    <textarea
                        className={classes['review-text']}
                        onChange={changeTextHandler}
                        value={isReview ? filterReview()[0].body : textArea}
                        readOnly={isReview}
                    />
                </div>
                <button
                    className={`${classes['btn-publish']} btn btn-outline-primary ${isReview && 'hide'}`}
                    disabled={!quoteIndex || textArea.length < 10}
                >
                    Pubblica
                </button>
            </div>
        </>
    );
};

export default ReviewModal;
