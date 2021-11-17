import classes from './AnnouncementListLayout.module.css';

const AnnouncementListLayout = ({children}) => {
    return (
        <div className={classes['announcements-layout']}>{children}</div>
    )
}

export default AnnouncementListLayout