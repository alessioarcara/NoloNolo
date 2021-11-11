import classes from './UserInfo.module.css';

const UserInfo = () => {
    return (
        <div className={classes['info-container']}>
            <div className={classes['presentation-container']}>
                <div className={classes['text-name']}>Ciao, io sono Foo</div>
                <div className={classes['from']}>Su NoloNolo dal 2021</div>
            </div>
            <div className={classes['image-container']}>
                <img
                    className={classes.avatar}
                    src={'https://www.animeita.net/events/pippo_foto02.jpg'}
                    alt={''}
                />
            </div>
        </div>
    );
}

export default UserInfo