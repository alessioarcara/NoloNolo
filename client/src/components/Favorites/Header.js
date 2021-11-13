import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes['favorites-header']}>
            <div className={classes['favorites-text']}>Preferiti</div>
        </div>
    );
}

export default Header