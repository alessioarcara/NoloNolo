import ImageCard from "./ImageCard";
import classes from './ImageList.module.css';

const ImageList = () => {
    const DUMMY_LOCATION = [
        {
            id: 'l1',
            text: 'Campania'
        },
        {
            id: 'l2',
            text: 'Emilia-Romagna'
        },
        {
            id: 'l3',
            text: 'Liguria'
        },
        {
            id: 'l4',
            text: 'Toscana'
        }
    ]

    return (
        <>
            <div className="subtitle">Naviga nelle nostre località</div>
            <div className={classes.list}>
                {DUMMY_LOCATION.map(place =>
                    <ImageCard
                        key={place.id}
                        id={place.id}
                        text={place.text}
                        image={place.image}
                    />
                )}
            </div>
        </>
    );
};

export default ImageList;
