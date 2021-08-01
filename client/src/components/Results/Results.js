import classes from './Results.module.css';
import ResultCard from "./ResultCard";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import '../Results/Placeholder.css';
import {PlaceholderConfig} from "../../helpers/placeholderConfig";
import useHttp from "../../hooks/use-http";
import {useEffect} from "react";
import {body_boats} from "../../helpers/httpConfig";

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
                placeholder={PlaceholderConfig}
                multiplier={10}
                delay={ 1000 }
            >
                {boats && boats.map(boat => (
                    <ResultCard
                        key={boat._id}
                        images={boat.hasAdvertisement.images}
                        model={boat.model}
                        description={boat.hasAdvertisement.description}
                        dailyFee={boat.hasAdvertisement.dailyFee}
                        totalFare={+props.missingDays * +boat.hasAdvertisement.dailyFee}
                        reviews={boat.hasAdvertisement.reviews}
                    />
                ))}
            </LetSuspense>
        </div>
    );
};

export default Results;
