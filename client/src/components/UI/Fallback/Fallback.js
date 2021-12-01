import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Fallback = () => {
    return (
        <div style={{display: "flex", width:"100%", height:"100vh", alignItems: "center"}}>
            <LoadingSpinner/>
        </div>
    )
}

export default Fallback
