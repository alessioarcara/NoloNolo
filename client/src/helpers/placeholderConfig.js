import '../components/Results/Placeholder.css';

export const PlaceholderConfig = () => {
    return (
        <div className="placeholder-card">
            <figure className="img-container loading"/>
            <div className="adapter-details">
                <p
                    className="loading"
                    style={{width: "10rem", height: 30}}
                />
                <p
                    className="loading"
                    style={{width: "12rem", height: 9, margin: "8px 0"}}
                />
                <p
                    className="loading"
                    style={{width: "10.7rem", height: 12, margin: "8px 0"}}
                />
                <p
                    className="loading"
                    style={{width: "9.5rem", height: 13, margin: "8px 0"}}
                />
                <p
                    className={`${'loading'} ${'btn-container'}`}
                    style={{width: "8.5rem", height: "2.4rem"}}
                />
            </div>
        </div>
    );
};