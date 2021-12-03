import React, {useCallback, useState} from "react";
import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import NewAdvertisementFooter from "./NewAdvertisementFooter/NewAdvertisementFooter";
import useForm from "../../hooks/use-form";
import {boatAdvertisementForm} from "../../helpers/formConfig";
import {body_addBoatImages, body_publishAdvertisement} from "../../helpers/httpConfig";
import MultipleImagesUpload from "../UI/MultipleImagesUpload/MultipleImagesUpload";

import classes from "./NewBoatAdvertisement.module.css";
import Spacer from "../UI/Spacer/Spacer";
import breakpointContext from "../../store/breakpoint-context";

const NewBoatAdvertisement = ({boatId, onMutationUserBoat}) => {
    const [files, setFiles] = useState([])
    const [error, setError] = useState("")
    const {formValues, renderFormInputs, isFormValid} = useForm(boatAdvertisementForm)

    const handleSelectMultipleFiles = useCallback(({target: {files}}) => {
        if (files.length > 3) return setError("Non puoi aggiungere più di tre immagini")
        setFiles(Object.values(files))
    }, [])

    const handleUnselectFile = useCallback(({target: {dataset: {file}}}) =>
            setFiles(prevFiles => prevFiles.filter((item, idx) => idx !== parseInt(file))),
        [])

    const handleAddBoatImages = useCallback((publishedBoatId) => {
        if (files.length === 0) return;
        const formData = new FormData()
        formData.append("operations", body_addBoatImages.operations(publishedBoatId))
        formData.append("map", body_addBoatImages.map)

        files.forEach((file, idx) => formData.append(idx.toString(), file))
        onMutationUserBoat(formData, prevBoats => prevBoats)
    }, [files, onMutationUserBoat])

    const handlePublishAdvertisement = useCallback(evt => {
        evt.preventDefault()
        onMutationUserBoat(
            body_publishAdvertisement({
                boatId,
                description: formValues[0],
                dailyFee: parseFloat(formValues[1]),
                fixedFee: parseFloat(formValues[2])
            }),
            (prevBoats, publishedBoat) => {
                handleAddBoatImages(publishedBoat._id)
                return prevBoats.filter(userBoat => userBoat._id !== publishedBoat._id)
            }
        )
    }, [formValues, boatId, handleAddBoatImages, onMutationUserBoat])

    return (
        <SplitScreenLayout
            layoutClassName={classes.layout}
            leftLayoutClassName={classes.leftLayout}
            rightLayoutClassName={classes.rightLayout}
            contentLeft={
                <h1>Ora, descrivi il tuo annuncio</h1>
            }
            contentRight={
                <form onSubmit={handlePublishAdvertisement}>
                    {renderFormInputs()}
                    <MultipleImagesUpload
                        files={files}
                        errorMessage={error}
                        onSelectFiles={handleSelectMultipleFiles}
                        onUnselectFile={handleUnselectFile}
                    />
                    {breakpoint === 'smartphone' && <Spacer heightVh={20}/>}
                    <NewAdvertisementFooter isDisabledNextStep={!isFormValid()} stepPosition={3}/>
                </form>
            }
        />
    );
}

export default NewBoatAdvertisement;
