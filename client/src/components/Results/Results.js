import classes from './Results.module.css';
import ResultCard from "./ResultCard";

const DUMMY_SEARCHES = [
    {
        id: 's1',
        shipowner: 'Mario Rossi',
        name: 'Agamennone I',
        description: '3 letti, 2 cabine, 1 bagno',
        image: 'http://avante.biz/wp-content/uploads/Boat-Wallpaper/Boat-Wallpaper-027.jpg',
        price: 120.00
    },
    {
        id: 's2',
        shipowner: 'Mario Verdi',
        name: 'Achille I',
        description: '2 letti, 1 cabina, 1 bagno',
        image: 'https://images8.alphacoders.com/355/thumb-1920-355077.jpg',
        price: 320.00
    },
    {
        id: 's3',
        shipowner: 'Mario Viola',
        name: 'Ettore II',
        description: 'Lungo 10m',
        image: 'https://img.nauticexpo.it/images_ne/photo-mg/27285-12815443.jpg',
        price: 320.00
    }
]

const Results = () => {
    return (
        <div className={classes.wrap}>
            {DUMMY_SEARCHES.map(results => (
                <ResultCard
                    key={results.id}
                    image={results.image}
                    name={results.name}
                    description={results.description}
                    price={results.price}
                />
            ))}
        </div>
    );
};

export default Results;