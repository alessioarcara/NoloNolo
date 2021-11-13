import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes['favorites-header']}>
            <h1 className="title">I miei preferiti</h1>
        </div>
    );
}

export default Header
