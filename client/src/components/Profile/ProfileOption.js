import {Link} from "react-router-dom";
import classes from "./ProfileOption.module.css"
import RightArrowIcon from "../UI/icons/RightArrowIcon";

const ProfileOption = ({link, icon, title, content}) => {
    return (
        <Link
            to={link}
            className={classes.option}>
                {icon}
                <h4 className={classes.title}>
                    {title}
                </h4>
                <div className={classes.text}>
                    {content}
                </div>
                <div className={classes.arrow}>
                    <RightArrowIcon/>
                </div>
        </Link>
    )
}

export default ProfileOption;
