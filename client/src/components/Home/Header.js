import SearchBar from "../UI/SearchBar/SearchBar";
import classes from "./Header.module.css";
import {useMemo, useRef} from "react";
import useIntersectionObserver from "../../hooks/use-intersection-observer";

const Header = props => {
    const navigationRef = useRef()

    const options = useMemo(() => {
        return {
            root: navigationRef.current
        }
    }, [navigationRef])

    const [ref, isIntersecting] = useIntersectionObserver(options)

    return (
        <>
            <div ref={ref} className={`title ${classes.title}`}>NoloNolo Boat</div>
            <SearchBar
                openModalHandler={props.openModalHandler}
                isShow={props.isShow}
                isWhite={!isIntersecting}
            />
        </>
    );
};

export default Header;
