import classes from "./Footer.module.css";
import PencilIcon from "../UI/icons/PencilIcon";
import NavigationBar from "../Navigation/NavigationBar";

const Footer = () => {
    return (
        <>
            <div className={classes.foot}>
                <PencilIcon/>
                <div className={classes['grid-footer']}>
                    <div>Arcara Alessio</div>
                    <div>Carchesio Michael</div>
                    <div>Crimaldi Alessia</div>
                </div>
            </div>
            <NavigationBar/>
        </>

    );
};

export default Footer;