import classes from './Results.module.css';
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import './BoatPlaceholder/BoatPlaceholder.css';
import {BoatPlaceholder} from "./BoatPlaceholder/BoatPlaceholder";
import BoatList from "../Advertisements/BoatList";
import Pagination from "../UI/Pagination/Pagination";

const Results = (props) => {
    const {status, data: boats, sendRequest: fetchResults} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.boats
        fetchResults({body: body_boats({where: "marina", skip: 0})}, transformData)
    }, [fetchResults])

    return (
        <div className={classes.wrap}>
            <LetSuspense
                condition={ status === 'completed' }
                placeholder={BoatPlaceholder}
                multiplier={10}
                delay={ 1000 }
            >
                <BoatList boats={boats}/>
                {boats &&
                <Pagination   data={boats}
                              pageLimit={5}
                              dataLimit={10}
                />
                }
            </LetSuspense>
        </div>
    );
};

export default Results;
