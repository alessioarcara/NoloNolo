import React, {useContext} from "react";
import {useStore} from "../hooks-store/store";
import BoatList from "../components/Advertisements/BoatList";
import BoatListLayout from "../components/UI/Layout/BoatListLayout/BoatListLayout";
import NotFoundFavorites from "../components/Favorites/NotFoundFavorites";
import AuthContext from "../store/auth-context";
import Header from "../components/UI/Header/Header";

const FavoritesPage = () => {
    const store = useStore()[0]
    const {isLoggedIn} = useContext(AuthContext)
    let content;

    if ((isLoggedIn && store.userFavorites && store.userFavorites.length === 0)) {
        content = <NotFoundFavorites/>
    } else {
        content = <BoatListLayout><BoatList boats={store.userFavorites}/></BoatListLayout>;
    }

    return (
        <div>
            <Header textTitle="I miei preferiti"/>
            {content}
        </div>
    )
}

export default FavoritesPage;
