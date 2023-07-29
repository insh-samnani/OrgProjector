import React, {useContext, useState} from 'react'
import workitemContext from "../Context/Workitems/workitemContext"

const CreateBacklog = (props) => {
    const context = useContext(workitemContext);
    const {createWorkitem} = context;
    const [workitem, setWorkitem] = useState({name: "", nature: "userstory"})

    const handleClick = (e)=>{
        e.preventDefault();
        createWorkitem(workitem.name, workitem.nature, props.projectId);
        setWorkitem({name: "", nature: "userstory"})
        props.setModal(false);
        props.showAlert("Created Successfully", "success");
    }

    const onChange = (e)=>{
        setWorkitem({...workitem, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <form className="my-3">
                <div className="mb-3">
                    <label style={{color: "#590268", fontSize: "25px"}} htmlFor="name" className="form-label">Name</label>
                    <input style={{backgroundColor: "#590268", color: "#f4e2f7"}} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={workitem.name} onChange={onChange} minLength={3} required /> 
                </div>
                <button style={{backgroundColor: "#590268", color: "#f4e2f7"}} disabled={workitem.name.length<2} type="submit" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleClick}>Create Backlog</button>
            </form>
        </div>
    )
}

export default CreateBacklog