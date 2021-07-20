import Header from "../components/Home/Header";
import ImageList from "../components/ImageList/ImageList";
import BoatType from "../components/Home/BoatType";
import Footer from "../components/Home/Footer";
import classes from "../components/Home/Header.module.css";
import backImage from "../assets/background.jpg";

const Home = () => {
    return (
        <>
            <Header/>
            <ImageList/>
            <BoatType/>
            <Footer/>
        </>
    );
};

export default Home;
