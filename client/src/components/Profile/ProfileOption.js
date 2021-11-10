import classes from "./ProfileOption.module.css"
import {Link} from "react-router-dom";

const ProfileOption = props => {

    return (
        <div className={classes.option}>
            <Link to={`${props.title.replace(/\s/g, "")}`}>
                {props.children}
                <h3>{props.title}</h3>
                <p>{props.content}</p>
            </Link>
        </div>
    )
}

export default ProfileOption;
