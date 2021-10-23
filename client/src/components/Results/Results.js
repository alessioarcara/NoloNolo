import classes from './Results.module.css';
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import './BoatPlaceholder/BoatPlaceholder.css';
import {BoatPlaceholder} from "./BoatPlaceholder/BoatPlaceholder";
import BoatList from "../Advertisements/BoatList";
import Pagination from "../UI/Pagination/Pagination";

const Results = ({status, boats}) => {
    return (
        <div className={classes["results-layout"]}>
            <LetSuspense
                condition={ status === 'completed' }
                placeholder={BoatPlaceholder}
                multiplier={10}
                delay={ 1000 }
            >
                <BoatList boats={boats}/>
                {boats &&
                <Pagination
                    data={boats}
                    pageLimit={5}
                    dataLimit={10}
                />
                }
            </LetSuspense>
        </div>
    );
};

export default Results;
