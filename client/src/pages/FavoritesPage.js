import React from "react";
import {useStore} from "../hooks-store/store";
import BoatList from "../components/Advertisements/BoatList";
import BoatListLayout from "../components/UI/Layout/BoatListLayout/BoatListLayout";

const FavoritesPage = () => {
    const store = useStore()[0]

    let content;

    if (store.userFavorites.length === 0) {
        content = <p>You got no favorites yet. Start adding some?</p>
    } else {
        content = <BoatListLayout><BoatList boats={store.userFavorites}/></BoatListLayout>;
    }

    return (
        <section className="centered">
            <h1>My favorites</h1>
            {content}
        </section>
    )
}

export default FavoritesPage;
