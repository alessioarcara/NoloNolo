import classes from './BoatPlaceholder.module.css';

export const BoatPlaceholder = () => {
    return (
        <div className={classes["placeholder-card"]}>
            <figure className={`${classes["img-container"]} ${classes.loading}`}/>
            <div className={classes["adapter-details"]}>
                <p
                    className={classes["loading"]}
                    style={{width: "10rem", height: 30}}
                />
                <p
                    className={classes["loading"]}
                    style={{width: "12rem", height: 9, margin: "8px 0"}}
                />
                <p
                    className={classes["loading"]}
                    style={{width: "10.7rem", height: 12, margin: "8px 0"}}
                />
                <p
                    className={classes["loading"]}
                    style={{width: "9.5rem", height: 13, margin: "8px 0"}}
                />
                <p
                    className={`${classes.loading} ${classes['btn-container']}`}
                    style={{width: "8.5rem", height: "2.4rem"}}
                />
            </div>
        </div>
    );
};