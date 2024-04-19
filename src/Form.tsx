const Form = () => {
    return (<>
        <form className="m-2 w-50 p-5 bg-secondary-subtle rounded-5 ">
            <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control w-50 mb-5" id="input_encargada" placeholder="Encargada" required />
            <input type="date" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control w-50 mb-5" id="input_date" placeholder="Fecha del Caso" required />
            <div className="d-flex flex-row mb-5">
                <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control" id="input_localidad" placeholder="Localidad" required />
                <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control" id="input_ubic_geo" placeholder="Ubicacion Geografica" required />
            </div>
            <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control mb-5 w-50" id="input_lugar" placeholder="Lugar del Hecho" required />
            <div className="d-flex flex-row mb-5">
                <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control" id="input_forma" placeholder="Forma" required />
                <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control" id="input_clasif" placeholder="Clasificacion" required />
            </div>
            <input type="text" className="shadow bg-secondary-subtle border-secondary-subtle text-secondary text-opacity-50 form-control mb-5" id="input_nota" placeholder="Link Nota" required />
        </form>
    </>);
};

export default Form;