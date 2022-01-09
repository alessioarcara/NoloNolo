import classes from './Note.module.css';

const Note = () => {
    return (
        <div className={classes['vat-container']}>
            <p>
                0% - Operazione senza applicazione dell'IVA,
                effettuata ai sensi dell'articolo 1, commi da 54 a 89,
                l. n. 190 del 2014 così come modificato dalla l. n. 208 del 2015 e dalla l. n. 145 del 2018
            </p>
        </div>
    );
}

export default Note