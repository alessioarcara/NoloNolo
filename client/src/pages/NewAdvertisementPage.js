import React from "react";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import ActionButtons from "../components/UI/ActionButtons/ActionButtons";

const NewAdvertisementPage = () => {
    return (
        <SplitScreenLayout contentLeft={<h1>Comincia adesso !</h1>}
                           contentRight={<h1>Eccomi</h1>}
                           actions={<ActionButtons/>}
        />
    );
}

export default NewAdvertisementPage;
