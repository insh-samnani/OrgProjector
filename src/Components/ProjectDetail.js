import React, { useContext, useEffect, useState } from 'react'
import organizationContext from "../Context/Organizations/organizationContext"
import projectContext from "../Context/Projects/projectContext"
import workitemContext from "../Context/Workitems/workitemContext"
import { useParams, useNavigate } from 'react-router-dom';

import ProjectMember from './ProjectMember';
import InviteMember from './InviteMember';
import ProjectWorkitem from './ProjectWorkitem';
import ProjectBacklog from './ProjectBacklog';
import CreateWorkitem from './CreateWorkitem';
import CreateBacklog from './CreateBacklog';

const ProjectDetail = (props) => {

    const { id } = useParams();

    const[modal, setModal] = useState(false);

    let history = useNavigate();
    const context = useContext(organizationContext);
    const context2  = useContext(projectContext);
    const context3  = useContext(workitemContext);
    const { organizations, getOrganization } = context;
    const { oneProject, getOneProject, projectMembers, getProjectMembers } = context2;
    const { projectWorkitem, getProjectWorkitem, backlog, getBacklog } = context3;

    useEffect(() => {
        if(localStorage.getItem('tokenn')){
            getProjectMembers(id);
            getOrganization();
            getOneProject(id);
            getProjectWorkitem(id);
            getBacklog(id);
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])

  return (
    <>
        <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Invite a Member</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <InviteMember showAlert ={props.showAlert} projectId = {id} setShowModal ={props.setShowModal} showModal ={props.showModal}/>
                    </div>
                </div>
            </div>
        </div>

        <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Project Workitems</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <ProjectWorkitem showAlert ={props.showAlert} workitem = {projectWorkitem} id ={id} role = {projectMembers.role}/>
                        {
                            projectMembers.role === "manager" ? <button type="submit" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={() => setModal(true)}>Create Workitem</button> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Project Backlog</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <ProjectBacklog showAlert ={props.showAlert} workitem = {backlog} id ={id} role = {projectMembers.role} />
                        {
                            projectMembers.role === "manager" ? <button type="submit" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal4" onClick={() => setModal(true)} >Create Backlog</button> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className={`modal fade ${modal ? 'show' : ''}`} id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Workitem</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <CreateWorkitem showAlert ={props.showAlert} projectId = {id} modal={modal} setModal={setModal} />
                    </div>
                </div>
            </div>
        </div>

        <div className={`modal fade ${modal ? 'show' : ''}`} id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Backlog</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <CreateBacklog showAlert ={props.showAlert} projectId = {id} modal={modal} setModal={setModal} />
                    </div>
                </div>
            </div>
        </div>

        <div style = {{display: "flex", flexDirection: "row"}}>
            <div style = {{flex: "1"}}>
                {organizations && organizations.map((organization) => {
                        return <div key={organization._id}>
                            <div className="col-md-4">
                                <div className="my-3">
                                    <div className="d-flex align-items-center">
                                        <button type="button" className="btn btn-dark" onClick={() => window.location.href = `/organizationDetail/${organization._id}`}>Go to {organization.name}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                })}
            </div>
            <div className="my-3" style = {{flex: "3"}}>
                {oneProject.project && oneProject.project.length > 0 && (
                    <h3>{oneProject.project[0].name}</h3>
                )}
                {projectMembers.role === "manager" ? 
                    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => props.setShowModal(true)}>Invite a Member</button> : <></>
                }
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => props.setShowModal(true)}>My Workitems</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => props.setShowModal(true)}>Project Backlog</button>
                <div>
                    {projectMembers.projectmembers && projectMembers.projectmembers[0].users.map((projectMember) => {
                        return <ProjectMember key={projectMember._id} member={projectMember} showAlert = {props.showAlert} role={projectMembers.role} projectId = {id} />
                    })}
                </div>
            </div>
        </div>

    </>
  )
}

export default ProjectDetail