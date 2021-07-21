import Header from "../components/Home/Header";
import ImageList from "../components/ImageList/ImageList";
import BoatType from "../components/Home/BoatType";
import Footer from "../components/Home/Footer";
import { useState } from "react";

const Home = () => {
    const [click, setClick] = useState(false);

    const clickChangeHandler = () => {
        setClick(true);
    }

    const clickHomeHandler = () => {
        setClick(false);
    }

    return (
        <>
            <Header
                click={click}
                changeHandler={clickChangeHandler}
                homeHandler={clickHomeHandler}
            />
            {!click &&
                <div>
                    <ImageList/>
                    <BoatType/>
                    <Footer/>
                </div>
            }
        </>
    );
}
;

export default Home;
