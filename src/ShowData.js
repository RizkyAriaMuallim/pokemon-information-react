function ShowData(props) {
    return(
        <>
            <h3>List Name of Pokemon!!!</h3>
            <ul>
                {props.data.map((names, index) => (
                    <li key={index}>{names.nama}</li>
                ))
                }
            </ul>
        </>
    )
};

export default ShowData;