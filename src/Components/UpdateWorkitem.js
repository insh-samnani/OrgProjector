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
                    <label style={{color: "#590268", fontSize: "25px"}} htmlFor="status" className="form-label">Status</label>
                    <select style={{backgroundColor: "#590268", color: "#f4e2f7"}} className="form-select" id="status" name="status" value={workitem.status} onChange={onChange} required>
                        <option style={{backgroundColor: "#590268", color: "#f4e2f7"}} value="select" >Select</option>
                        <option style={{backgroundColor: "#590268", color: "#f4e2f7"}} value="Inprogress">Inprogress</option>
                        <option style={{backgroundColor: "#590268", color: "#f4e2f7"}} value="Completed">Completed</option>
                    </select>
                </div>
                <button style={{backgroundColor: "#590268", color: "#f4e2f7"}} type="submit" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleClick}>Update Workitem</button>
            </form>
        </div>
    )
}

export default UpdateWorkitem