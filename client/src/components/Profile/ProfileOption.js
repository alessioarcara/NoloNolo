import classes from "./ProfileOption.module.css"
import {Link, useRouteMatch} from "react-router-dom";

const ProfileOption = props => {
    let match = useRouteMatch()

    return (
        <div className={classes.option}>
            <Link to={`${match.url}/${props.title.replace(/\s/g, "")}`}>
                {props.children}
                <h3>{props.title}</h3>
                <p>{props.content}</p>
            </Link>
        </div>
    )
}

export default ProfileOption;
