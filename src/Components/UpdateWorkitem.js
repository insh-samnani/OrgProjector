import React, {useContext, useState} from 'react'
import workitemContext from "../Context/Workitems/workitemContext"

const UpdateWorkitem = (props) => {
    const context = useContext(workitemContext);
    const {updateWorkitem} = context;
    const [workitem, setWorkitem] = useState({status: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        updateWorkitem(props.workitemid, workitem.status, props.id);
        setWorkitem({status: ""})
        props.setShowModal(false);
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e)=>{
        setWorkitem({...workitem, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select className="form-select" id="status" name="status" value={workitem.status} onChange={onChange} required>
                        <option value="select">Select</option>
                        <option value="Inprogress">Inprogress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleClick}>Update Workitem</button>
            </form>
        </div>
    )
}

export default UpdateWorkitem