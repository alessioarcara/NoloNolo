import {useCallback, useContext, useRef, useState} from "react";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main"
import Footer from "../components/Home/Footer";
import Search from "../components/Home/Search/Search";
import SearchBar from "../components/Home/SearchBar";
import Modal from "../components/UI/Modal/Modal";
import BreakpointContext from "../store/breakpoint-context";

const Home = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [isShown, setIsShown] = useState(false);

    const breakpointCtx = useContext(BreakpointContext)
    const searchRef = useRef()

    const changeHandler = useCallback(event => {
        setSearchTerm(event.target.value)
    }, [])

    const openModalHandler = () => {
        setIsShown(true)
    }
    const closeModalHandler = () => {
        setIsShown(false)
    }

    return (
        <>
            {isShown &&
            <Modal adapterSize={breakpointCtx.breakpoint}>
                <Search searchTerm={searchTerm} searchRef={searchRef}>
                    <SearchBar
                        ref={searchRef}
                        isShow={isShown}
                        searchTerm={searchTerm}
                        changeHandler={changeHandler}
                        openModalHandler={openModalHandler}
                        closeModalHandler={closeModalHandler}
                    />
                </Search>
            </Modal>
            }
            {!isShown &&
            <Header
                isShow={isShown}
                openModalHandler={openModalHandler}
                closeModalHandler={closeModalHandler}
            />
            }
            <Main/>
            <Footer/>
        </>
    );
};

export default Home;
