import React, {useCallback, useState} from "react";
import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import useForm from "../../hooks/use-form";
import {boatAdvertisementForm} from "../../helpers/formConfig";
import {body_addBoatImages, body_publishAdvertisement} from "../../helpers/httpConfig";
import MultipleImagesUpload from "../UI/MultipleImagesUpload/MultipleImagesUpload";

import classes from "./NewBoatAdvertisement.module.css";

const NewBoatAdvertisement = ({boatId, onMutationUserBoat}) => {
    const [files, setFiles] = useState([])
    const {formValues, renderFormInputs, isFormValid} = useForm(boatAdvertisementForm)

    const handleSelectMultipleFiles = useCallback(({target: {files}}) => {
        // if (files.length > 3) return alert("Non puoi aggiungere più di tre immagini")
        setFiles(Object.values(files))
    }, [])

    const handleUnselectFile = useCallback(({target: {dataset: {file}}}) =>
            setFiles(prevFiles => prevFiles.filter((item, idx) => idx !== parseInt(file))),
        [])

    const handleAddBoatImages = () => {
        const formData = new FormData()
        formData.append("operations", body_addBoatImages.operations(boatId))
        formData.append("map", body_addBoatImages.map)

        files.forEach((file, idx) => formData.append(idx.toString(), file))
        onMutationUserBoat(formData)
    }

    const handlePublishAdvertisement = (evt) => {
        evt.preventDefault()
        onMutationUserBoat(
            body_publishAdvertisement({
                boatId,
                description: formValues[0],
                dailyFee: parseFloat(formValues[1]),
                fixedFee: parseFloat(formValues[2])
            }),
            resData => {
                handleAddBoatImages()
                // return ()
            },
            // () => `/profile`
        )
    }

    const title = <h1>Ora, descrivi il tuo annuncio</h1>
    const content = (
        <form className={classes.container} onSubmit={handlePublishAdvertisement}>
            {renderFormInputs()}
            <MultipleImagesUpload
                files={files}
                onSelectFiles={handleSelectMultipleFiles}
                onUnselectFile={handleUnselectFile}
            />
            <NewAdvertisementFooter isDisabledNextStep={!isFormValid()} stepPosition={3}/>
        </form>
    )

    return (
        <SplitScreenLayout
            contentLeft={title}
            contentRight={content}
        />
    );
}

export default NewBoatAdvertisement;
