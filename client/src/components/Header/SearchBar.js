import classes from './SearchBar.module.css';
import SearchIcon from "../UI/icons/SearchIcon";

const SearchBar = () => {
    return (
        <div className={classes[`background-searchbar`]}>
            <div className={classes[`search-bar`]}>
                <SearchIcon/>
                <input type='search' placeholder='Qual è la tua meta?'/>
            </div>
        </div>
    );
};

export default SearchBar;