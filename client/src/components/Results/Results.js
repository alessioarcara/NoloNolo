import classes from './Results.module.css';
import ResultCard from "./ResultCard";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import '../Results/Placeholder.css';
import {PlaceholderConfig} from "../../helpers/placeholderConfig";
import useHttp from "../../hooks/use-http";
import {useEffect, useState} from "react";
import {body_boats} from "../../helpers/httpConfig";

const Results = () => {
    return (
        <div className={classes.wrap}>
            <LetSuspense
                condition={ status === 'completed' }
                placeholder={PlaceholderConfig}
                multiplier={2}
                initialDelay={1000}
            >
                {boats && boats.map(boat => (
                    <ResultCard
                        key={results.id}
                        image={results.image}
                        name={results.name}
                        description={results.description}
                        price={results.price}
                    />
                ))}
            </LetSuspense>
        </div>
    );
};

export default Results;