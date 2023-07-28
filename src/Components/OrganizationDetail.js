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

    const handleCreateProjectClick = () => {
        props.setShowModal(true);
    };

    const handleJoinProjectClick = () => {
        props.setShowModal(true);
    };

    const handleViewWorkitem = () => {
        props.setShowModal(true);
    };

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
            <div className="row my-3" style = {{flex: "3"}}>
                <div className="container d-flex flex-column align-items-center" style={{marginBottom: "30px"}}>
                    <h1 style={{color: "#590268"}}>PROJECTS</h1>
                    <h3>{organization.name}</h3>
                    <h5>{organization.country}</h5>
                </div>
                {projects && projects.map((project) => {
                        return <ProjectItem key={project._id} projects={project} showAlert = {props.showAlert} />
                })}
                <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top:'92vh', right: '3vh', justifyContent: "flex-end", marginTop: "20px" }}>
                    <i className="fa-solid fa-circle-plus fa-2xl sticky-bottom fa-spin" style={{ color: "#000000", cursor: 'pointer' ,fontSize:"6vh"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleCreateProjectClick} title="Create Project"></i>
                </div>
                <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top:'82vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                    <i className="fa-solid fa-users-viewfinder fa-2xl sticky-bottom fa-spin" style={{ color: "#000000", cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={handleJoinProjectClick} title="Join Project"></i>
                </div>
                {organizationWorkitem.organizationworkitems && organizationWorkitem.organizationworkitems.length > 0 ? (
                        <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top:'72vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                            <i className="fa-solid fa-briefcase fa-2xl sticky-bottom fa-spin" style={{ color: "#000000", cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={handleViewWorkitem} title="Join Project"></i>
                        </div>
                    ) : (
                    null
                )}
            </div>
        </div>
    </>
  )
}

export default OrganizationDetail