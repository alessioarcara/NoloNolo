import classes from './UserInfo.module.css';
import {useRef} from "react";
import {body_addAvatar} from "../../../helpers/httpConfig";
import {DEFAULT_AVATAR, IMAGE_PATH} from "../../../helpers/constants";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const getImagePath = (userObject) => `${IMAGE_PATH}${userObject.avatar.substring(1)}`

const UserInfo = ({status, user, sendFile, token}) => {
    const fileRef = useRef()

    const fileUploadHandler = (evt) => {
        evt.preventDefault()
        const formData = new FormData()
        formData.append("operations", body_addAvatar.operations)
        formData.append("map", body_addAvatar.map)
        formData.append("0", fileRef.current.files[0])

        sendFile({body: formData, token}, resData => resData[Object.keys(resData)])
    }

    return (
        <div className={classes['info-container']}>
            <div className={classes['presentation-container']}>
                <div className={classes['text-name']}>Ciao, io sono {user && user.email.split('@')[0]}</div>
                <div className={classes['from']}>Su NoloNolo dal 2021</div>
            </div>
            <div className={classes['image-container']}>
                <div className={classes['image']}>
                    {status === "pending" ? <LoadingSpinner/> :
                        <img
                            className={classes.avatar}
                            src={user && (user.avatar ? getImagePath(user) : DEFAULT_AVATAR)}
                            alt={''}
                        />
                    }
                </div>
                <form onSubmit={fileUploadHandler}>
                    <input ref={fileRef} name="avatar" type="file"/>
                    <button>Upload</button>
                </form>
            </div>
        </div>
    );
}

export default UserInfo