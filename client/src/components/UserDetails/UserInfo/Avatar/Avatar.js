import classes from './Avatar.module.css';
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import {DEFAULT_AVATAR, IMAGE_PATH} from "../../../../helpers/Utils/constants";
import {body_addAvatar} from "../../../../helpers/httpConfig";
import {useState} from "react";
import PencilIcon from "../../../UI/icons/PencilIcon";
import CheckIcon from "../../../UI/icons/CheckIcon";
import Button from "../../../UI/Button/Button";

const getImagePath = (userObject) => `${IMAGE_PATH}${userObject.avatar.substring(1)}`

const Avatar = ({status, user, sendFile}) => {
    const [file, setFile] = useState(null)

    const fileUploadHandler = (evt) => {
        evt.preventDefault()
        const formData = new FormData()
        formData.append("operations", body_addAvatar.operations)
        formData.append("map", body_addAvatar.map)
        formData.append("0", file)

        sendFile(formData)
        setFile(null)
    }

    return (
        <div className={classes['avatar-container']}>
            {status === "pending" ? <LoadingSpinner/> :
                <img
                    className={classes.avatar}
                    src={user && (user.avatar ? getImagePath(user) : DEFAULT_AVATAR)}
                    alt={''}
                />
            }
            <form className={classes['icon-container']} onSubmit={fileUploadHandler}>
                <input
                    id='change-avatar'
                    name="avatar"
                    type="file"
                    onChange={(evt) => {
                        setFile(evt.target.files[0])
                    }}
                    style={{display: 'none'}}
                />
                {!file
                    ? <label htmlFor='change-avatar'><PencilIcon/></label>
                    : <Button className={classes.upload}><CheckIcon/></Button>
                }
            </form>
        </div>
    );
}

export default Avatar
