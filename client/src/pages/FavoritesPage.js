import React from "react";
import {useStore} from "../hooks-store/store";
import BoatList from "../components/Advertisements/BoatList";
import BoatListLayout from "../components/UI/Layout/BoatListLayout/BoatListLayout";
import ElementsNotFound from "../components/UI/ElementsNotFound/ElementsNotFound";
import Header from "../components/UI/Header/Header";
import Spacer from "../components/UI/Spacer/Spacer";

const FavoritesPage = () => {
    const store = useStore()[0]
    let content;

    if (store.userFavorites?.length > 0) {
        content = <BoatListLayout><BoatList boats={store.userFavorites}/></BoatListLayout>;
    } else {
        content = <ElementsNotFound
            warningText="Non hai ancora nessuna barca preferita! Premi sul &hearts; per aggiungerle tra i preferiti."
            warningTextButton="Cerca"
            path="/"
        />
    }

    return (
        <>
            <Header textTitle={"I miei preferiti"}/>
            {content}
            <Spacer heightVh="15"/>
        </>
    )
}

export default FavoritesPage;
