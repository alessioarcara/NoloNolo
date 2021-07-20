import {useState} from "react";

import SearchBar from "./SearchBar";
import Modal from "./Modal";
import classes from "./Header.module.css";

const Header = (props) => {
    const [click, setClick] = useState(false);

    const clickChangeHandler = () => {
        setClick(true);
    }

    const clickHomeHandler = () => {
        setClick(false);
    }

    return (
        <>
            {!click &&
                <div>
                    <div className='title'>
                        <p>NoloNolo Boat</p>
                    </div>
                    <div className={classes[`main-image`]}>
                        <img src={backImage} alt="Some boats"/>
                    </div>
                </div>
            }
            <SearchBar onClicked={clickChangeHandler} click={click} onClose={clickHomeHandler}/>
            {click && <Modal/>}
        </>
    );
};

export default Header;