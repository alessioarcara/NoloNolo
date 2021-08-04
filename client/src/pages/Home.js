import {useCallback, useContext, useState} from "react";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main"
import Footer from "../components/Home/Footer";
import Search from "../components/Search/Search";
import Modal from "../components/UI/Modal/Modal";
import BreakpointContext from "../store/breakpoint-context";


const Home = () => {
    const [isShown, setIsShown] = useState(false);
    const breakpointCtx = useContext(BreakpointContext)

    const showHandler = useCallback(() => {
        setIsShown(prevState => !prevState)
    }, [])

    return (
        <>
            {isShown &&
            <Modal
                adapterSize={breakpointCtx.breakpoint}
                closeModalHandler={showHandler}
            >
                <Search closeModalHandler={showHandler}/>
            </Modal>
            }
            {!isShown &&
            <Header
                isShow={isShown}
                openModalHandler={showHandler}
            />
            }
            <Main/>
            <Footer/>
        </>
    );
};

export default Home;
