import Form from "./Form"
import SideBarProgress from "./SideBarProgress";

const FormContainer = () =>{
    return(
        <div className="d-flex flex-row w-100 justify-content-center">
            <SideBarProgress/>
            <Form/>
        </div>
    );
}

export default FormContainer;