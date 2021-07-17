import Header from "../components/Home/Header";
import classes from "../components/Home/Header.module.css";
import backImage from "../assets/background.jpg";
import ImageList from "../components/ImageList/ImageList";

const Home = () => {
    return (
        <>
            <Header/>
            <div className={classes[`main-image`]}>
                <img src={backImage} alt="Some boats"/>
            </div>
            <ImageList />
        </>
    );
};

export default Home;
