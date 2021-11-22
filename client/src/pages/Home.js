import {useCallback, useContext, useEffect, useState} from "react";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main"
import Footer from "../components/Home/Footer";
import Search from "../components/Search/Search";
import Modal from "../components/UI/Modal/Modal";
import BreakpointContext from "../store/breakpoint-context";
import {useLocation, useNavigate} from "react-router-dom";


const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(location.state ? location.state.isOpenModal : false);
    const breakpointCtx = useContext(BreakpointContext)

    const showHandler = useCallback(() => {
        setIsShown(prevState => !prevState)
    }, [])

    useEffect(() => {
        navigate({replace: true})
    }, [navigate])

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
