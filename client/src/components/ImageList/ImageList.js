import ImageCard from "../UI/ImageCard/ImageCard";
import classes from './ImageList.module.css';

const ImageList = () => {
    const DUMMY_LOCATION = [
        {
            id: 'l1',
            text: 'Campania',
            image: '../../../assets/Campania.png'
        },
        {
            id: 'l2',
            text: 'Liguria',
            image: '../../../assets/Liguria.jpg'
        },
        {
            id: 'l3',
            text: 'Abruzzo',
            image: '../../../assets/Liguria.jpg'
        },
        {
            id: 'l4',
            text: 'Lazio',
            image: '../../../assets/Liguria.jpg'
        },
        {
            id: 'l5',
            text: 'Sardegna',
            image: '../../../assets/Liguria.jpg'
        },
        {
            id: 'l5',
            text: 'Sardegna',
            image: '../../../assets/Liguria.jpg'
        },
        {
            id: 'l5',
            text: 'Sardegna',
            image: '../../../assets/Liguria.jpg'
        },
        {
            id: 'l5',
            text: 'Sardegna',
            image: '../../../assets/Liguria.jpg'
        }
    ]

    return (
        <>
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