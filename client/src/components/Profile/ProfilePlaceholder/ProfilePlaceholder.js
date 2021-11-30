import classes from './ProfilePlaceholder.module.css';

const ProfilePlaceholder = () => {
    return (
        <div className={classes['profile-placeholder']}>
            <div className={classes['card-container']}>
                {Array(4).fill(
                    <div
                        className={`${classes.loading} ${classes['card-board']}`}
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

export default ProfilePlaceholder