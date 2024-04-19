import { DateTime } from 'luxon';

const categoriaMapToDisplay = {
    femicidio: "Femicidio",
    intento_femicidio: "Intento de Femicidio",
    transfemicidio: "Transfemicidio",
    femicidio_vinculado: "Femicidio Vinculado",
    intento_femicidio_vinculado: "Intento de Femicidio Vinculado",
    investiga_femicidio: "Se Investiga - Femicidio",
    investiga_femicidio_vinculado: "Se Investiga - Femicidio Vinculado",
    investiga_transfemicidio: "Se Investiga - Transfemicidio",
};


const List = ({ elements }) => {

    elements.sort((a,b)=>new Date(b.fecha) - new Date(a.fecha))

    return (<div>
        {elements.map((el) => (
            <div className="card shadow mb-3 mt-3 border border-0 w-auto d-flex flex-row align-items-center p-1 rounded-4" style={{backgroundColor: "#f6deba"}} key={el.id}>
                <div className="card-body">

                    <p className="card-subtitle fw-bold">Nombre de la Victima: {el.nombre_victima}</p>
                    <p className="card-subtitle fw-bold">Fecha de Caso: {DateTime.fromISO(el.fecha).setLocale("es").toLocaleString()}</p>
                    <p className="card-subtitle fw-bold">Categoria: {categoriaMapToDisplay[el.categoria]}</p>
                    <p className="card-subtitle fw-bold">Nombre Agresor: {el.nombre_agresor}</p>
                    <p className="card-subtitle fw-bold">Ciudad: {el.ubicacion}</p>

                </div>
                <p className="card-subtitle fw-bold">Completo</p>
            </div>))}
    </div>)
}

export default List;