import classes from './AdvertisementPlaceholder.module.css'

export const AdvertisementPlaceholder = () => {
    return (
        <div className={classes['placeholder-advertisement']}>
            <div className={`${classes.loading} ${classes['content-left']}`}/>
            <div className={classes['content-right']}>
                {/* Advertisement data */}
                <div
                    className={`${classes.loading} ${classes['is-show']}`}
                    style={{width: '100%', height: '100%', borderRadius: '1rem', marginTop: '2rem'}}
                />
                <div
                    className={classes.bar}
                    style={{width: '100%', height: '3rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '40%', height: '1.7rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '30%', height: '1rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '35%', height: '0.5rem'}}
                />
                <hr/>
                {/* Shipowner data */}
                <div>
                    <div className={classes.loading} style={{width: '60%', height: '1rem'}}/>
                    <div
                        className={classes.loading}
                        style={{float: 'right', borderRadius: '50%', width: '3rem', height: '3rem'}}
                    />
                    <div className={classes.loading} style={{width: '70%', height: '0.7rem', marginTop: '0.7rem'}}/>
                </div>

                {/* Shipowner description */}
                <div
                    className={classes.loading}
                    style={{width: '70%', height: '0.3rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '80%', height: '0.3rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '75%', height: '0.3rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '68%', height: '0.3rem'}}
                />
                <div
                    className={classes.loading}
                    style={{width: '71%', height: '0.3rem'}}
                />
                <hr/>
                <div
                    className={classes.loading}
                    style={{width: '100%', height: '100%', borderRadius: '1rem'}}
                />
            </div>
        </div>
    );
}