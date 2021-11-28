import classes from './ConfirmSection.module.css';

const ConfirmSection = ({text, onConfirm}) => {
    return (
        <div className={classes['delete-section']}>
            <p>{text}</p>
            <button
                className={`btn btn-outline-primary ${classes['btn-confirm']}`}
                onClick={onConfirm}
            >
                Conferma
            </button>
        </div>
    );
}

export default ConfirmSection;
