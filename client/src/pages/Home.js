import Header from "../components/Home/Header";
import classes from "../components/Home/Header.module.css";
import backImage from "../assets/background.jpg";
import ImageList from "../components/ImageList/ImageList";

const Home = () => {
    return (
        <>
            <Header/>
            <div className={classes[`main-image`]}>
                <img src={backImage} alt="An image with a boat"/>
            </div>
            <ImageList />
        </>
    );
};

export default Home;