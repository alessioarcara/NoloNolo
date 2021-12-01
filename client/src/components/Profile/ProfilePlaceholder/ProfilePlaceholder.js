import classes from './ProfilePlaceholder.module.css';

export const ProfilePlaceholder = () => {
    return (
        <div className={classes['profile-placeholder']}>
            <div className={classes['card-container']}>
                {Array(4).fill().map((_, index) =>
                    <div
                        key={index}
                        className={classes.loading}
                        style={{width: "100%", height: "100%", borderRadius: "1rem"}}
                    />
                )}
            </div>
            <div className={classes['single-card']}>
                <div
                    className={classes.loading}
                    style={{width: '100%', height: '100%', borderRadius: '1rem'}}
                />
            </div>
            <div
                className={classes.loading}
                style={{width: "10rem", height: "3rem", borderRadius: "10px"}}
            />
        </div>
    );
}
