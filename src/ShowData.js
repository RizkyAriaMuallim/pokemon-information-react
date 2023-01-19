function ShowData(props) {
    return(
        <>
            <h3>Halo kak</h3>
            {props.data.map((names, index) => (
                <div key={index}>
                    <ul>
                        <li>{names.nama}</li>
                    </ul>
                </div>
            ))
            }
        </>
    )
};

export default ShowData;