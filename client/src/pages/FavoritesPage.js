import React, {useContext} from "react";
import {useStore} from "../hooks-store/store";
import BoatList from "../components/Advertisements/BoatList";
import BoatListLayout from "../components/UI/Layout/BoatListLayout/BoatListLayout";
import Header from "../components/Favorites/Header";
import AuthContext from "../store/auth-context";
import ElementsNotFound from "../components/UI/ElementsNotFound/ElementsNotFound";

const FavoritesPage = () => {
    const store = useStore()[0]
    const {isLoggedIn} = useContext(AuthContext)
    let content;

    if ((isLoggedIn && store.userFavorites && store.userFavorites.length === 0)) {
        content = <ElementsNotFound
            warningText="Non hai ancora nessuna barca preferita! Premi sul &hearts; per aggiungerle tra i preferiti."
            warningTextButton="Cerca"
            path="/"
        />
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
