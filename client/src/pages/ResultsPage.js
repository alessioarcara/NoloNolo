import Results from "../components/Results/Results";
import BackIcon from "../components/UI/icons/BackIcon";
import classes from './ResultsPage.module.css';

const ResultsPage = () => {
    return (
        <>
            <div className={classes['style-back']}><BackIcon/></div>
            <div className={classes['header-title']}>Numero barche restituite</div>
            <div className={classes['filters-container']}>
                <button className={classes['btn-filter']} type="button">Tipologia</button>
                <button className={classes['btn-filter']} type="button">Prezzo</button>
                <button className={classes['btn-filter']} type="button">Skipper</button>
                <button className={classes['btn-filter']} type="button">Ospiti</button>
            </div>
            <Results/>
        </>
    );
};

export default ResultsPage;