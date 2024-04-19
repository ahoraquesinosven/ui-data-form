import { useState, useEffect } from 'react';
import List from "./List";


const fetchCases = () => {
    return fetch("http://localhost:8080/v1/cases")
        .then((response) => response.json())
};

const ListContainer = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCases().then((data) => setData(data));
    });

    return (
        <div className="container-fluid w-50 d-flex flex-column justify-content-center shadow rounded-1" style={{border: "solid 3px #f6deba"}}>
            <List elements={data} />
        </div>
    );
}

export default ListContainer;