import React from "react";
import classes from './MultipleImagesUpload.module.css';
import CameraIcon from "../icons/CameraIcon";

const MultipleImagesUpload = ({files, onSelectFiles, onUnselectFile}) => {
    const images = Object.values(files).map(file => URL.createObjectURL(file))

    return (
        <div className={classes['multiple-images-upload']}>
            {images.map((url, idx) =>
                <div className={classes['container']} key={idx}>
                    <div className={classes['image-container']}>
                        <img
                            src={url}
                            alt=""
                            className={classes.image}
                        />
                    </div>
                    <button
                        data-file={idx}
                        className={classes['delete-button']}
                        onClick={onUnselectFile}
                        type="button">&#10060;
                    </button>
                </div>
            )}
            {images.length < 3 &&
                <label className={classes['add-images-container']} htmlFor="multiple-images-uploader">
                    <CameraIcon/>
                    <input
                        id="multiple-images-uploader"
                        name="multiple-images-uploader"
                        type="file"
                        onChange={onSelectFiles}
                        multiple
                    />
                </label>
            }
        </div>
    )
}

export default MultipleImagesUpload;
