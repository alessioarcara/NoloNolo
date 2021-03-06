import React from "react";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import './BoatPlaceholder/BoatPlaceholder.module.css';
import {BoatPlaceholder} from "./BoatPlaceholder/BoatPlaceholder";
import BoatList from "../Advertisements/BoatList";
import Pagination from "../UI/Pagination/Pagination";
import BoatListLayout from "../UI/Layout/BoatListLayout/BoatListLayout";
import {useStore} from "../../hooks-store/store";

const Results = ({status, boats, switchPage, numberPage}) => {

    const store = useStore()[0]

    const updatedBoats = store.userFavorites && boats?.map(boat => {
        if (store.userFavorites.some(userFav => userFav._id === boat._id)) {
            return {
                ...boat,
                advIsFavorite: true
            }
        }
        return {
            ...boat,
            advIsFavorite: false
        }
    })

    return (
        <>
            <BoatListLayout>
                <LetSuspense
                    condition={status === 'completed'}
                    placeholder={BoatPlaceholder}
                    initialDelay={400}
                    checkOnce={true}
                    multiplier={20}
                >
                    <BoatList boats={updatedBoats || boats}/>
                </LetSuspense>
            </BoatListLayout>
            {boats?.length > 0 &&
            <Pagination
                dataCount={boats[0].totalCount}
                dataLimit={20}
                setCurrentPage={switchPage}
                currentPage={numberPage}
            />
            }
        </>
    );
};

export default React.memo(Results);
