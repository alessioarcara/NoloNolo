import Star from "./Star/Star";

const Vote = ({votes, quoteIndex, changeQuoteIndex, placeholder = false}) => {
    return (
        votes.map((quote, index) =>
            <Star
                key={index}
                index={index}
                changeQuote={changeQuoteIndex}
                isSelected={index <= quoteIndex}
                placeholderQuote={placeholder}
            />
        )
    );
}

export default Vote