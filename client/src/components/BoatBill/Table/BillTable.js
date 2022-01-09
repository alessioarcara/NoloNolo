const BillTable = ({thead, thbody, className}) => {
    return (
        <table className={className}>
            <thead>
                <tr>
                    {thead.map((element, index) => (
                        <th key={index}>{element}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                    {thbody.map(({description, cost}, index) => (
                        <tr key={index}>
                            <td>{description}</td>
                            <td>{cost}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default BillTable