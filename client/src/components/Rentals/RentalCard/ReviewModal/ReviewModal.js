import classes from "./ReviewModal.module.css";
import {useCallback, useState} from "react";
import Vote from "../../../UI/Vote/Vote";
import {body_publishReview} from "../../../../helpers/httpConfig";
import {formatDayMonthYearDate} from "../../../../helpers/utils";

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
                rentalId,
                body: textArea,
                rating: parseInt(quoteIndex) + 1
            }),
            (prevRentals, newReview) => prevRentals.map(userRental => userRental._id === newReview.rental ? {
                    ...userRental,
                    boat: {
                        ...userRental.boat,
                        hasAdvertisement: {
                            ...userRental.boat.hasAdvertisement,
                            reviews: userRental.boat.hasAdvertisement.reviews.concat(newReview)
                        }
                    }
                } : userRental
            )
        )
    }

    return (
        <form onSubmit={submitFormHandler}>
            <div className={classes['review-container']}>
                <span className={classes[`review-title`]}>
                    {/*{isReview*/}
                    {/*    ? "La tua recensione"*/}
                    {/*    : "Scrivi la tua recensione!"*/}
                    {/*}*/}
                </span>
                <div className={classes[`five-stars`]}>
                    <span className={classes.quote}>
                        {/*{isReview()*/}
                        {/*    ? `Valutata: ${votes[filterReview()[0].rating - 1]}`*/}
                        {/*    : votes[quoteIndex]*/}
                        {/*        ? votes[quoteIndex]*/}
                        {/*        : 'Valuta questa barca'}*/}
                        {votes[quoteIndex] ? votes[quoteIndex] : 'Valuta questa barca'}
                    </span>
                    <div className={classes.stars}>
                        <Vote
                            votes={votes}
                            // quoteIndex={isReview() ? filterReview()[0].rating - 1 : quoteIndex}
                            quoteIndex={quoteIndex}
                            changeQuoteIndex={changeQuoteIndex}
                            // placeholder={isReview()}
                        />
                    </div>
                </div>
                <div className={classes['review-text-container']}>
                    <span>
                        {/*{isReview*/}
                        {/*    ? "Il tuo feedback:"*/}
                        {/*    : "Lasciaci il tuo feedback:"*/}
                        {/*}*/}
                        Lascia il tuo feedback
                    </span>
                    <textarea
                        className={classes['review-text']}
                        onChange={changeTextHandler}
                        // value={isReview() ? filterReview()[0].body : textArea}
                        value={textArea}
                        // disabled={isReview()}
                    />
                </div>
                {/*<div className={`${isReview() ? classes['created-at-container'] : "hide"}`}>*/}
                {/*    <span>Lasciata il {formatDayMonthYearDate(new Date(+filterReview()[0].createdAt), {day: 'numeric', month: 'long', year: 'numeric'})}</span>*/}
                {/*</div>*/}
                <button
                    className={`${classes['btn-publish']} btn btn-outline-primary`}
                    disabled={!quoteIndex || textArea.length < 10}
                >
                    Pubblica
                </button>
            </div>
        </form>
    );
};

export default ReviewModal;
