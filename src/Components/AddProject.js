import React, {useContext, useState} from 'react'
import projectContext from "../Context/Projects/projectContext"

const AddProject = (props) => {
    const context = useContext(projectContext);
    const {addProject} = context;
    const [project, setProject] = useState({name: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addProject(project.name, props.id);
        setProject({name: ""})
        props.setShowModal(false)
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e)=>{
        setProject({...project, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={project.name} onChange={onChange} minLength={5} required /> 
                </div>
                <button disabled={project.name.length<5} type="submit" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleClick}>Add Project</button>
            </form>
        </div>
    )
}

export default AddProject