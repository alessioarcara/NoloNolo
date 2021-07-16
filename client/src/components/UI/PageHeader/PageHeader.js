import BackIcon from "../icons/BackIcon";
import SearchBar from "../../Home/SearchBar";
import classes from "./PageHeader.module.css";

const PageHeader = () => {
    return (
        <>
            <div className={classes.line}>
                <div><BackIcon/></div>
                <div><SearchBar/></div>
            </div>
        </>
    );
};

export default PageHeader;