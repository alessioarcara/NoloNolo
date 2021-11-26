import classes from './Header.module.css';

const Header = ({backElement, textTitle, optionsElement}) => {
    return (
        <div className={classes['header']}>
            <div className={classes['header-container']}>
                <div className={classes['first-element']}>{backElement}</div>
                <h1 className={`${classes['second-element']} title`}>{textTitle}</h1>
                <div className={classes['third-element']}>{optionsElement}</div>
            </div>
        </div>
    );
};

export default Header;