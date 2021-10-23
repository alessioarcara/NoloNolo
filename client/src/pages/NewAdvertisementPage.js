import classes from "./NewAdvertisementPage.module.css"
import ActionButtons from "../components/UI/ActionButtons/ActionButtons";

const NewAdvertisementPage = () => {
    return (
        <main>
            <div className={classes.layout}>
                <div className={classes["left-layout"]}>
                    <h1>Comincia adesso</h1>
                </div>
                <div className={classes["right-layout"]}>
                    <div>
                    </div>
                    <div>
                        <ActionButtons
                            // actionClassName={classes[`actions-bottom`]}
                            firstButtonClassName={classes[`btn-skip`]}
                            // firstButtonClickHandler={skipClickHandler}
                            firstButtonText='Esci'
                            secondButtonClassName={classes[`btn-forward`]}
                            // secondButtonClickHandler={goForwardClickHandler}
                            secondButtonText='Avanti'
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default NewAdvertisementPage;
