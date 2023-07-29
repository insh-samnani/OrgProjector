import React, {useState, useEffect, useContext} from 'react'
import projectContext from "../Context/Projects/projectContext"
import { useNavigate } from 'react-router-dom';

const ProjectMember = (props) => {
    const member = props.member
    const [check, setCheck] = useState('')

    let history = useNavigate();

    const context  = useContext(projectContext);
    const { getProjectMembers } = context;

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

    const handleDeleteClick = async (memberId, projectId) => {

        const response = await fetch(`http://localhost:3000/api/User/DeleteMember/${projectId}/${memberId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('tokenn')
            }
        });
        getProjectMembers(props.projectId);
        setCheck("done");
        console.log(response);
    };

    return (
        <div className="col">
            <div className="card my-3" style={{backgroundColor: "#f4e2f7", borderRadius: "13px", border: "3px solid #590268"}}>
                <div className="card-body container d-flex flex-column align-items-center">
                    <div className='container'>
                        <div className="row">
                            <div className="col-2">
                                <i className="fa-solid fa-person fa-lg" style={{color: "#000000"}}></i>
                            </div>
                            <div className="col-10">
                            <div className="d-flex align-items-center">
                                <h5 style={{color: "#590268"}} className="card-title">{member.firstName + " " +member.lastName}</h5>
                            </div>
                            <p style={{color: "#590268"}}>{member.email}</p>
                            {props.role === "manager" ? 
                                <div className="container d-flex flex-column align-items-end" style={{ justifyContent: "flex-end", marginTop: "20px" }}>
                                <i className="fa-solid fa-trash fa-lg" style={{ color: "#000000", cursor: 'pointer'}} onClick={() => handleDeleteClick(member._id, props.projectId)} title="Delete Member"></i>
                            </div> : <></>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectMember;