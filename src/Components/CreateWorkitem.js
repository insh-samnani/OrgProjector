import React, {useContext, useState} from 'react'
import workitemContext from "../Context/Workitems/workitemContext"

const CreateWorkitem = (props) => {
    const context = useContext(workitemContext);
    const {createWorkitem} = context;
    const [workitem, setWorkitem] = useState({name: "", nature: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        createWorkitem(workitem.name, workitem.nature, props.projectId);
        setWorkitem({name: "", nature: ""})
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={workitem.name} onChange={onChange} minLength={3} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="nature" className="form-label">Nature</label>
                    <select className="form-select" id="nature" name="nature" value={workitem.nature} onChange={onChange} required>
                        <option value="select">Select</option>
                        <option value="bug">Bug</option>
                        <option value="task">Task</option>
                    </select>
                </div>
                <button disabled={workitem.name.length<2} type="submit" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleClick}>Create Workitem</button>
            </form>
        </div>
    )
}

export default CreateWorkitem