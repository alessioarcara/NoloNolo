import {useContext, useState} from "react";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main"
import Footer from "../components/Home/Footer";
import Search from "../components/Home/Search/Search";
import Modal from "../components/UI/Modal/Modal";
import BreakpointContext from "../store/breakpoint-context";

const Home = () => {
    const [isShown, setIsShown] = useState(false);
    const breakpointCtx = useContext(BreakpointContext)

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
                <Search/>
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
