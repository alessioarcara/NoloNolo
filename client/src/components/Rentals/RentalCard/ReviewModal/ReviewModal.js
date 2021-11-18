import classes from "./ReviewModal.module.css";
import {useCallback, useState} from "react";
import Star from "./Star/Star";
import Button from "../../../UI/Button/Button";

const ReviewModal = () => {
    const quotes = ['Scadente', 'Non buono', 'Buono', 'Ottimo', 'Eccellente']
    const [quoteIndex, setQuoteIndex] = useState()
    const [textArea, setTextArea] = useState('')

    const changeQuoteIndex = useCallback((index) => {
        setQuoteIndex(index)
    }, [setQuoteIndex])

    const changeTextHandler = (event) => {
        setTextArea(event.target.value)
    }

    return (
        <>
            <div className={classes['review-container']}>
                <span className={classes[`review-title`]}>Scrivi la tua recensione!</span>
                <div className={classes[`five-stars`]}>
                    <span className={classes.quote}>{quotes[quoteIndex] ? quotes[quoteIndex] : 'Valuta questa barca'}</span>
                    <div className={classes.stars}>
                        {quotes.map((quote, index) => (
                            <Star
                                key={index}
                                index={index}
                                changeQuote={changeQuoteIndex}
                                isSelected={index <= quoteIndex}
                            />
                        ))}
                    </div>
                </div>
                <div className={classes['review-text-container']}>
                    <span>Lasciaci il tuo feedback:</span>
                    <textarea
                        className={classes['review-text']}
                        onChange={changeTextHandler}
                        value={textArea}
                    />
                </div>
                <button
                    className={`${classes['btn-publish']} btn btn-outline-primary`}
                    disabled={!quoteIndex || !textArea}
                >
                    Pubblica
                </button>
            </div>
        </>
    );
};

export default ReviewModal;
