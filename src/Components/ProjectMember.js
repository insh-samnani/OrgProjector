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
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{member.firstName + " " +member.lastName}</h5>
                    </div>
                    <p>{member.email}</p>
                    {props.role === "manager" ? 
                        <button type="button" onClick={() => handleDeleteClick(member._id, props.projectId)} className="btn btn-dark">Delete {member.firstName}</button> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectMember;