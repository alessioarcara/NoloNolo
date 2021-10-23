import classes from "./BoatListLayout.module.css"

const BoatListLayout = ({children}) => {
    return (
        <div className={classes["results-layout"]}>{children}</div>
    )
}

export default BoatListLayout;
