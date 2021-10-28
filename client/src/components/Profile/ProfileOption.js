import {Link, useRouteMatch} from "react-router-dom";
import classes from "./ProfileOption.module.css"

const ProfileOption = props => {
    let match = useRouteMatch()

    return (
            <div className={classes.option}>
                <Link className={classes.singleop} to={`${match.url}/${props.title.replace(/\s/g, "")}`}>
                    {props.children}
                    <h4>{props.title}</h4>
                    <p>{props.content}</p>
                </Link>
            </div>
    )
}

export default ProfileOption;