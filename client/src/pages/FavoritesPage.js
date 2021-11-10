import React from "react";
import {useStore} from "../hooks-store/store";
import BoatList from "../components/Advertisements/BoatList";
import BoatListLayout from "../components/UI/Layout/BoatListLayout/BoatListLayout";
import Header from "../components/Favorites/Header";
import NotFoundFavorites from "../components/Favorites/NotFoundFavorites";

const FavoritesPage = () => {
    const store = useStore()[0]

    let content;

    if (store.userFavorites && store.userFavorites.length === 0) {
        content = <NotFoundFavorites/>
    } else {
        content = <BoatListLayout><BoatList boats={store.userFavorites}/></BoatListLayout>;
    }

    return (
        <div>
            <Header/>
            {content}
        </div>
    )
}

export default FavoritesPage;
