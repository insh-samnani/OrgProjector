import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import workitemContext from "../Context/Workitems/workitemContext"

import UpdateWorkitem from './UpdateWorkitem';

const ProjectWorkitem = (props) => {
    const [selectedWorkitemId, setSelectedWorkitemId] = useState(null);
    const [check, setCheck] = useState('')
    const [showModal, setShowModal] = useState(false)
    let history = useNavigate();

    const context  = useContext(workitemContext);
    const { getProjectWorkitem } = context;

    const handleUpdateClick = (workitemId) => {
        setShowModal(true);
        setSelectedWorkitemId(workitemId);
    };

    useEffect(() => {
        if(localStorage.getItem('tokenn')){
            if(check === "done"){
                props.showAlert("Deleted Successfully", "danger");
            }
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [check])

    const handleDeleteClick = async (workitemId, projectId) => {

        const response = await fetch(`http://localhost:3000/api/Workitems/DeleteWorkitem/${projectId}/${workitemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('tokenn')
            }
        });
        const json = await response.json()
        console.log(json);
        getProjectWorkitem(props.id);
        setCheck("done");
    };
    
    return (
        <>
        <div className={`modal fade ${showModal ? 'show' : ''}`} id="exampleModal5" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Workitem</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <UpdateWorkitem showAlert ={props.showAlert} id = {props.id} workitemid = {selectedWorkitemId} setShowModal ={setShowModal} showModal ={showModal}/>
                    </div>
                </div>
            </div>
        </div>

        <div style = {{display: "flex", flexDirection: "row"}}>
            <div style = {{flex: "1"}}>
                {props.workitem.projectworkitems && props.workitem.projectworkitems.map((workitemm) => {
                        return <div key={workitemm._id}>
                            <div style = {{flex: "1", display: "flex", flexDirection: "row"}}>
                                <div style = {{flex: "3"}}> 
                                    <h4>{props.workitem.project[0].name}</h4>       
                                    <p>Workitem Name: {workitemm.name}</p>
                                    <p>Nature: {workitemm.nature}</p>
                                    <p>State: {workitemm.state}</p>
                                </div>
                                <div style = {{flex: "1"}}>
                                    <button style = {{marginTop: "30px", width: "100px"}} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal5" onClick={() => handleUpdateClick(workitemm._id)}>Update</button>
                                    {
                                    props.role === "manager" ? <button style = {{marginTop: "10px", width: "100px"}} type="button" onClick={() => handleDeleteClick(workitemm._id, props.id)} className="btn btn-dark">Delete</button> : <></>
                                    }                                
                                </div>
                            </div>
                        </div>
                })}
            </div>
        </div>
        </>
    )
}

export default ProjectWorkitem