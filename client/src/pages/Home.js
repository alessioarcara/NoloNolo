import Header from "../components/Home/Header";
import ImageList from "../components/ImageList/ImageList";
import BoatType from "../components/Home/BoatType";
import Footer from "../components/Home/Footer";
import Search from "../components/Home/Search";
import SearchBar from "../components/Home/SearchBar";

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
                </>
            }
        </>
    );
};

export default Home;