import SearchBar from "./SearchBar";
import Modal from "./Modal";
import classes from "./Header.module.css";
import backImage from "../../assets/background.jpg";

const Header = (props) => {

    return (
        <>
            {!props.click &&
                <div className='title'>
                    <p>NoloNolo Boat</p>
                </div>
            }
            <SearchBar onClicked={props.changeHandler} click={props.click} onClose={props.homeHandler}/>
            {!props.click &&
                <div>
                    <div className={classes[`main-image`]}>
                        {/*<img src={backImage} alt="Background boat"/>*/}
                    </div>
                </div>
            }

            {props.click && <Modal/>}
        </>
    );
};

export default Header;