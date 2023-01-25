import {useState} from "react";
import classes from './ReadMoreText.module.css';

const ReadMoreText = ({classNameContent, classNameShowContentBtn, text}) => {
    const [isReadMore, setIsReadMore] = useState(false)

    const toggleReadMore = () => {
        setIsReadMore(prevState => !prevState)
    }
    return (
        <>
            <div className={classNameContent ? classNameContent : classes.content}>
                {text.length > 150
                    ? isReadMore
                        ? text
                        : text.slice(0, 150).concat('...')
                    : text
                }
            </div>
            {text.length > 150
                ?   <span
                        className={classNameShowContentBtn ? classNameShowContentBtn : classes['show-more-btn']}
                        onClick={toggleReadMore}
                    >
                        {!isReadMore ? 'Mostra altro' : 'Nascondi'}
                    </span>
                : ''
            }
        </>
    );
}

export default ReadMoreText;
