import Header from "../components/Home/Header";
import classes from "../components/Home/Home.module.css";
import backImage from "../images/background.jpg";

const Home = () => {
    return (
        <>
            <Header/>
            <div className={classes[`main-image`]}>
                <img src={backImage} alt="Some boats"/>
            </div>
        </>
    );
};

export default Home;
