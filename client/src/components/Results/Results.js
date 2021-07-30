import classes from './Results.module.css';
import ResultCard from "./ResultCard";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import '../Results/Placeholder.css';
import {PlaceholderConfig} from "../../helpers/placeholderConfig";

const DUMMY_SEARCHES = [
    {
        id: 's1',
        shipowner: 'Mario Rossi',
        name: 'Agamennone I',
        description: '3 letti, 2 cabine, 1 bagno',
        image: [
            'https://cdn.samboat.it/announcements/5a7ec62feb292-l.png',
            'https://www.velaemotore.it/files/articoli/1/2/9/12958/B_bavaria-330_1.jpg',
            'https://cdn.samboat.it/announcements/5d3f2a8bc701d-l.jpg'
        ],
        price: 140.00
    },
    {
        id: 's2',
        shipowner: 'Mario Bianchi',
        name: 'Leone IV',
        description: '1 letto, 1 bagno',
        image: [
            'http://www.piubenessere.it/wp-content/uploads/2018/03/barca-a-vela.jpg',
            'https://i1.wp.com/www.corrieretneo.it/wp-content/uploads/2018/04/8-barca-a-vela-Kitiara-Pascoe.jpg?fit=678%2C509&ssl=1',
            'https://newsmondo.it/wp-content/uploads/2021/03/viaggio_barca_vela.jpg.webp'
        ],
        price: 220.00
    },
    {
        id: 's3',
        shipowner: 'Mario Verdi',
        name: 'Achille III',
        description: '2 letti, 2 bagni',
        image: [
            'https://www.mondovela.it/content/images/thumbs/0013293_valium-62-luxury-catamaran-crociera-in-catamarano-mediterraneo_870.jpeg',
            'https://www.skipperclub.it/media/k2/items/cache/806b6e1806566ad52df50ee6cecd90ef_L.jpg'
        ],
        price: 220.00
    }
]

const Results = () => {
    return (
        <div className={classes.wrap}>
            <LetSuspense
                condition={false}
                placeholder={PlaceholderConfig}
                multiplier={2}
                initialDelay={1000}
            >
                {DUMMY_SEARCHES.map(results => (
                    <ResultCard
                        key={results.id}
                        image={results.image}
                        name={results.name}
                        description={results.description}
                        price={results.price}
                    />
                ))}
            </LetSuspense>
        </div>
    );
};

export default Results;