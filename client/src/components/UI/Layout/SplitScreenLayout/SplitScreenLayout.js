import classes from "./SplitScreenLayout.module.css";

const SplitScreenLayout = ({contentLeft, contentRight, actions, layoutClassName, leftLayoutClassName,
                               rightLayoutClassName, rightLayoutContentClassName, rightLayoutActionsClassName}) => {
    return (
        <section className={`${classes.layout} ${layoutClassName}`}>
            <div className={`${classes["left-layout"]} ${leftLayoutClassName}`}>
                {contentLeft}
            </div>
            <div className={`${classes["right-layout"]} ${rightLayoutClassName}`}>
                <div className={`${rightLayoutContentClassName}`}>
                    {contentRight}
                </div>
                <div className={`${classes["right-layout-actions"]} ${rightLayoutActionsClassName}`}>
                    {/*<p>ACTIONS</p>*/}
                    {/*{actions}*/}
                </div>
            </div>
        </section>
    );
};

export default SplitScreenLayout;
