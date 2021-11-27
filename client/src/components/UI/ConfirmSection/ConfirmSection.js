import classes from './ConfirmSection.module.css';

const ConfirmSection = ({text, handleClickButton}) => {
    return (
        <div className={classes['delete-section']}>
            <p>{text}</p>
            <button
                className={`btn btn-outline-primary ${classes['btn-confirm']}`}
                onClick={handleClickButton}
            >
                Conferma
            </button>
        </div>
    );
}

export default ConfirmSection;