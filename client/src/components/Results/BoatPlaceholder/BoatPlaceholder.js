import classes from './BoatPlaceholder.module.css';

export const BoatPlaceholder = () => {
    return (
        <div className={classes["placeholder-card"]}>
            <div className={`${classes["img-container"]} ${classes.loading}`}/>
            <div className={classes["adapter-details"]}>
                <div
                    className={classes["loading"]}
                    style={{width: "10rem", height: 15}}
                />
                <div
                    className={classes["loading"]}
                    style={{width: "8rem", height: 6}}
                />
                <div
                    className={`${classes["loading"]} ${classes['price']}`}
                    style={{width: '11rem', height: 8}}
                />
                <div
                    className={classes["loading"]}
                    style={{width: "4rem", height: 10, alignSelf: "flex-end", marginTop: "auto"}}
                />
                <div
                    className={`${classes.loading} ${classes['btn-container']}`}
                    style={{height: "2rem"}}
                />
            </div>
        </div>
    );
};