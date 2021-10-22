import {Link} from "react-router-dom";

import classes from "./FeaturedShipowner.module.css"

const FeaturedShipowner = () => {
    return (
        <section>
            <div className={classes["shipowner-box"]}>
                <div className={classes["shipowner-box-text"]}>
                    <div className="subtitle">Sei il proprietario di una barca?</div>
                    <p>Proponi la tua barca per guadagnare qualcosa in più e cogliere nuove opportunità.</p>
                    <Link className={classes["shipowner-box-link"]} to="/become-shipowner">
                        Scopri di più
                    </Link>
                </div>
                <div className={classes["shipowner-box-image"]}/>
            </div>
        </section>
    )
}

export default FeaturedShipowner;
