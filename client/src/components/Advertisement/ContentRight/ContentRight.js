import ContentSwitch from "./ContentSwitch";

const ContentRight = ({setVisibleContent}) => {

    return (
        <>
            <ContentSwitch setVisibleContent={setVisibleContent}/>
            <div style={{overflowY: "scroll"}}>

            </div>

        </>
    );
}

export default ContentRight;