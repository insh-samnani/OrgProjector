import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import workitemContext from "../Context/Workitems/workitemContext"

import UpdateWorkitem from './UpdateWorkitem';

const ProjectBacklog = (props) => {

    const [selectedWorkitemId, setSelectedWorkitemId] = useState(null);
    const [check, setCheck] = useState('')
    const [showModal, setShowModal] = useState(false)
    let history = useNavigate();

    const context  = useContext(workitemContext);
    const { getBacklog } = context;

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
        getBacklog(props.id);
        setCheck("done");
    };
    
    return (
        <>

        <div className={`modal fade ${showModal ? 'show' : ''}`} id="exampleModal6" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{backgroundColor: "#f4e2f7",border: "3px solid #590268", borderRadius: "20px"}}>
                    <div className="modal-header">
                        <h5 className="modal-title" style={{color: "#590268", fontSize: "25px"}} id="exampleModalLabel">Create Workitem</h5>
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
                {props.workitem.backlogitems && props.workitem.backlogitems.map((workitemm) => {
                        return <div key={workitemm._id}>
                            <div style = {{flex: "1", display: "flex", flexDirection: "row"}}>
                                <div style = {{flex: "3"}}>  
                                    <h4 style={{color: "#590268"}}>{props.workitem.project[0].name}</h4>      
                                    <p style={{color: "#590268"}}>Workitem Name: {workitemm.name}</p>
                                    <p style={{color: "#590268"}}>Nature: {workitemm.nature}</p>
                                    <p style={{color: "#590268"}}>State: {workitemm.state}</p>
                                </div>
                                <div style = {{flex: "1"}}>
                                    <i className="fa-solid fa-pen fa-xl" style={{ marginTop: "50px", color: "#000000", cursor: 'pointer', display: "block"}} data-bs-toggle="modal" data-bs-target="#exampleModal6" onClick={() => handleUpdateClick(workitemm._id)} title="Update Backlog"></i>
                                    {
                                    props.role === "manager" ?  <i className="fa-solid fa-trash fa-xl" style={{ marginTop: "50px", color: "#000000", cursor: 'pointer'}} onClick={() => handleDeleteClick(workitemm._id, props.id)} title="Delete Backlog"></i>: <></>
                                    } 
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                })}
            </div>
        </div>
        </>
    )
}

export default ProjectBacklog