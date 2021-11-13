import {Link} from "react-router-dom";
import classes from "./ProfileOption.module.css"
import RightArrowIcon from "../UI/icons/RightArrowIcon";

const ProfileOption = props => {

    return (
        <div className={classes.option}>
            <Link
                className={classes.singleop}
                to={props.link}
            >
                {props.icon}
                <h4>{props.title}</h4>
                <p>{props.content}</p>
                <div className={classes.arrow}>
                    <RightArrowIcon/>
                </div>
            </Link>
        </div>
    )
}

export default ProfileOption;
