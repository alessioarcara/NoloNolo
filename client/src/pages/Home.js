import {useRef, useState} from "react";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main"
import Footer from "../components/Home/Footer";
import Search from "../components/Home/Search/Search";
import SearchBar from "../components/Home/SearchBar";
import NavigationBar from "../components/Navigation/NavigationBar";

const Home = () => {

    const [isShown, setIsShown] = useState(false);
    const searchRef = useRef()

    const openModalHandler = () => {
        setIsShown(true)
    }
    const closeModalHandler = () => {
        setIsShown(false)
    }

    return (
        <>
            {isShown &&
                <Search searchRef={searchRef}>
                    <SearchBar
                        ref={searchRef}
                        isShow={isShown}
                        openModalHandler={openModalHandler}
                        closeModalHandler={closeModalHandler}
                    />
                </Search>}
            {!isShown &&
                <>
                    <Header
                        isShow={isShown}
                        openModalHandler={openModalHandler}
                        closeModalHandler={closeModalHandler}
                    />
                    <Main/>
                    <Footer/>
                    <NavigationBar/>
                </>
            }
        </>
    );
};

export default Home;