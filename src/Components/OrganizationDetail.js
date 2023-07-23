import React, { useContext, useEffect } from 'react'
import projectContext from "../Context/Projects/projectContext"
import organizationContext from "../Context/Organizations/organizationContext"
import { useParams, useNavigate } from 'react-router-dom';

import AddProject from './AddProject';
import ProjectItem from './ProjectItem';
import JoinProject from './JoinProject';
import OrganizationWorkitem from './OrganizationWorkitem';

const OrganizationDetail = (props) => {

    const { id } = useParams();

    let history = useNavigate();
    const context = useContext(projectContext);
    const context2 = useContext(organizationContext);
    const { projects, organizations, organization, getProject } = context;
    const { getOrganizationWorkitem, organizationWorkitem } = context2;

    useEffect(() => {
        if(localStorage.getItem('tokenn')){
            getProject(id);
            getOrganizationWorkitem(id);
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
                        <h5 className="modal-title" id="exampleModalLabel">Create a Project</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <AddProject showAlert ={props.showAlert} id ={organization._id} setShowModal ={props.setShowModal} showModal ={props.showModal}/>
                    </div>
                </div>
            </div>
        </div>

        <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Join a Project</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)} ></button>
                    </div>
                    <div className="modal-body">
                        <JoinProject showAlert ={props.showAlert} setShowModal ={props.setShowModal} showModal ={props.showModal} />
                    </div>
                </div>
            </div>
        </div>

        <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Organization Workitems</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)} ></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <OrganizationWorkitem showAlert ={props.showAlert} workitem ={organizationWorkitem} />
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
                <h2>Projects</h2>
                <h5>{organization.name}</h5>
                <h5>{organization.country}</h5>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => props.setShowModal(true)}>Create a Project</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => props.setShowModal(true)}>Join a Project</button>
                {organizationWorkitem.organizationworkitems && organizationWorkitem.organizationworkitems.length > 0 ? (
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => props.setShowModal(true)}>
                            View my WorkItems
                        </button>
                    ) : (
                        null
                )}
                {projects && projects.map((project) => {
                    return <ProjectItem key={project._id} projects={project} showAlert = {props.showAlert} />
                })}
            </div>
        </div>
    </>
  )
}

export default OrganizationDetail