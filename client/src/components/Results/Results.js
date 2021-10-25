import LetSuspense from "../UI/LetSuspense/LetSuspense";
import './BoatPlaceholder/BoatPlaceholder.module.css';
import {BoatPlaceholder} from "./BoatPlaceholder/BoatPlaceholder";
import BoatList from "../Advertisements/BoatList";
import Pagination from "../UI/Pagination/Pagination";
import BoatListLayout from "../UI/Layout/BoatListLayout/BoatListLayout";
import {useStore} from "../../hooks-store/store";

const Results = ({status, boats, switchPage, numberPage}) => {

    const store = useStore()[0]

    const updatedBoats = boats && boats.map(boat => {
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
                {/*<LetSuspense*/}
                {/*    condition={status === 'completed'}*/}
                {/*    placeholder={BoatPlaceholder}*/}
                {/*    multiplier={10}*/}
                {/*    delay={1000}*/}
                {/*>*/}
                    <BoatList boats={updatedBoats}/>
                {/*</LetSuspense>*/}
            </BoatListLayout>
            {boats &&
            <Pagination
                dataCount={60}
                setCurrentPage={switchPage}
                currentPage={numberPage}
                dataLimit={10}
            />
            }
        </>
    );
};

export default Results;
