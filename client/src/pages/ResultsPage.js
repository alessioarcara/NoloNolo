import Results from "../components/Results/Results";
import BackIcon from "../components/UI/icons/BackIcon";
import classes from './ResultsPage.module.css';
import ScrollSmooth from "../components/UI/ScrollSmooth/ScrollSmooth";
import ArrowTopIcon from "../components/UI/icons/ArrowTopIcon";

const ResultsPage = () => {
    return (
        <>
            <div className={classes['style-back']}><BackIcon/></div>
            <div id="ccc" className={classes['header-title']}>Numero barche restituite</div>
            <div className={classes['filters-container']}>
                <button className={classes['btn-filter']} type="button">Tipologia</button>
                <button className={classes['btn-filter']} type="button">Prezzo</button>
                <button className={classes['btn-filter']} type="button">Skipper</button>
                <button className={classes['btn-filter']} type="button">Ospiti</button>
            </div>
            <ScrollSmooth
                // x={document.getElementById('ccc').offsetTop}
                className={classes['position-scroll']} btn="true"
            >
                <ArrowTopIcon/>
            </ScrollSmooth>
            <Results/>
        </>
    );
};

export default ResultsPage;