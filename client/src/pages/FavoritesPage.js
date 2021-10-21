import React from "react";
import {useStore} from "../hooks-store/store";
import ResultCard from "../components/Results/ResultCard";

const FavoritesPage = () => {
    const store = useStore()[0]

    console.log(store.userFavorites)
    let content;

    if (store.userFavorites.length === 0) {
        content = <p>You got no favorites yet. Start adding some?</p>
    } else {
        content = store.userFavorites.map(userFav =>
            <ResultCard
                id={userFav._id}
                images={userFav.images}
                model={userFav.model}
                description={userFav.description}
                dailyFee={userFav.dailyFee}
                totalFare={+userFav.missingDays * +userFav.dailyFee}
                reviews={userFav.reviews}
            />)
    }

    return (
        <section className="centered">
            <h1>My favorites</h1>
            {content}
        </section>
    )
}

export default FavoritesPage;
