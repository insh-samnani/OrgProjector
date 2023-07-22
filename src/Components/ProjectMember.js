import React from 'react'

const ProjectMember = (props) => {
    const member = props.member

    const handleDeleteClick = async (memberId, projectId) => {

        const response = await fetch(`http://localhost:3000/api/User/DeleteMember/${projectId}/${memberId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('tokenn')
            }
        });
        const json = await response.json()
        console.log(json);
        props.showAlert("Deleted Successfully", "danger");
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