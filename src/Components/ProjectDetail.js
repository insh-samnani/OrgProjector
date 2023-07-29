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
import OrganizationPane from './OrganizationPane';

const ProjectDetail = (props) => {

    const { id } = useParams();

    const [modal, setModal] = useState(false);

    let history = useNavigate();
    const context = useContext(organizationContext);
    const context2 = useContext(projectContext);
    const context3 = useContext(workitemContext);
    const { organizations, getOrganization } = context;
    const { oneProject, getOneProject, projectMembers, getProjectMembers } = context2;
    const { projectWorkitem, getProjectWorkitem, backlog, getBacklog } = context3;

    useEffect(() => {
        if (localStorage.getItem('tokenn')) {
            getProjectMembers(id);
            getOrganization();
            getOneProject(id);
            getProjectWorkitem(id);
            getBacklog(id);
        }
        else {
            history("/login");
        }

        const handleResize = () => {
            setDisplay(window.innerWidth <= 1280 ? false : true);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line
    }, [])

    const handleMyWorkItems = () => {
        props.setShowModal(true);
    };

    const handleProjectBacklog = () => {
        props.setShowModal(true);
    };

    const handleInviteMember = () => {
        props.setShowModal(true);
    };

    const [display, setDisplay] = useState(window.innerWidth <= 1280 ? false : true)
    const onClickHandler = () => {
        setDisplay(false)
    }
    const onClickChanger = () => {
        setDisplay(true)
    }
    const attachClickEvent = window.innerWidth < 1280 ? onClickHandler : null;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrganizations = organizations.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [aeroPos, setAeroPos] = useState(false)

    const onClickPos = () => {
        setAeroPos(!aeroPos);
    }

    return (
        <>
            <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 style={{ color: "#590268", fontSize: "25px" }} className="modal-title" id="exampleModalLabel">Invite a Member</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <InviteMember showAlert={props.showAlert} projectId={id} setShowModal={props.setShowModal} showModal={props.showModal} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: "#590268", fontSize: "25px" }} id="exampleModalLabel">Project Workitems</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <ProjectWorkitem showAlert={props.showAlert} workitem={projectWorkitem} id={id} role={projectMembers.role} />
                            {
                                projectMembers.role === "manager" ? <button style={{ backgroundColor: "#590268", color: "#f4e2f7" }} type="submit" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={() => setModal(true)}>Create Workitem</button> : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: "#590268", fontSize: "25px" }} id="exampleModalLabel">Project Backlog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <ProjectBacklog showAlert={props.showAlert} workitem={backlog} id={id} role={projectMembers.role} />
                            {
                                projectMembers.role === "manager" ? <button style={{ backgroundColor: "#590268", color: "#f4e2f7" }} type="submit" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal4" onClick={() => setModal(true)} >Create Backlog</button> : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${modal ? 'show' : ''}`} id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: "#590268", fontSize: "25px" }} id="exampleModalLabel">Create Workitem</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <CreateWorkitem showAlert={props.showAlert} projectId={id} modal={modal} setModal={setModal} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${modal ? 'show' : ''}`} id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: "#590268", fontSize: "25px" }} id="exampleModalLabel">Create Backlog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <CreateBacklog showAlert={props.showAlert} projectId={id} modal={modal} setModal={setModal} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="left-pane" style={{ display: display ? 'block' : 'none', zIndex: "100", position: 'fixed', top: '56px', left: 0, bottom: 0, width: '100%', maxWidth: '300px', backgroundColor: 'rgb(244, 226, 247)', padding: '20px' }}>
                <div style={{ display: window.innerWidth >= 1280 ? 'none' : 'block' }}>

                    <i className="fa-solid fa-xmark d-flex justify-content-end fa-2xl my-3" onClick={onClickHandler}></i>
                    <hr />
                </div>
                <div className='d-flex my-3'>
                    <div className=" w-100">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                        </form>
                    </div>

                </div>

                <i className="fa-solid fa-sitemap fa-2xl my-4 d-flex justify-content-center"></i>

                <div className="overflow-y-scroll" style={{
                    maxHeight: '70vh',
                    overflowY: 'auto'
                }}>
                    {filteredOrganizations.map((organization) => {
                        return (
                            <div className='list-group list-group-flush ' style={{ borderRadius: "5px" }}>
                                <OrganizationPane organization={organization} key={organization._id} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div
                className="row my-3"
                style={{
                    marginLeft: display ? '17vw' : '',
                    width: display ? 'calc(100% - 17vw)' : '',
                    padding: display ? '' : '10px'
                }}
                onClick={attachClickEvent}
            >
                <div className={window.innerWidth >= 1280 ? '' : 'd-flex'} style={{ display: window.innerWidth >= 1280 ? 'none' : 'block' }}>
                    <i className="fa-solid fa-caret-down fa-2xl my-2" onClick={(e) => {
                        e.stopPropagation();
                        onClickChanger();
                    }}></i>
                    <h5 className='mx-3'>ORGANIZATIONS</h5>
                </div>

                <div className="my-3" style={{ flex: "3" }}>
                    {oneProject.project && oneProject.project.length > 0 && (
                        <h3>{oneProject.project[0].name}</h3>
                    )}
                    <div className="row">
                        {projectMembers.projectmembers && projectMembers.projectmembers[0].users.map((projectMember) => {
                            return <>
                                <div className="col-md-5">
                                    <ProjectMember key={projectMember._id} member={projectMember} showAlert={props.showAlert} role={projectMembers.role} projectId={id} />
                                </div>
                            </>
                        })}
                    </div>
                    {projectMembers.role === "manager" ? (
                        <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top: '60vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                            <i className={`fa-solid fa-people-arrows fa-2xl sticky-bottom ${aeroPos ? "d-block" : "d-none"}`} style={{ color: "#000000", cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleInviteMember} title="Invite a Member"></i>
                            <h6 className={`${aeroPos ? "d-block" : "d-none"}`} style={{marginRight: "45px"}}>Invite a Member</h6>
                        </div>
                    ) : (
                        null
                    )}
                    <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top: '70vh', right: '3vh', justifyContent: "flex-end", marginTop: "20px" }}>
                        <i className={`fa-solid fa-person-digging fa-2xl sticky-bottom ${aeroPos ? "d-block" : "d-none"}`} style={{ color: "#000000", cursor: 'pointer', fontSize: "6vh" }} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={handleMyWorkItems} title="My Workitems"></i>
                        <h6 className={`${aeroPos ? "d-block" : "d-none"}`} style={{marginRight: "55px"}}>My Workitems</h6>
                    </div>
                    <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top: '80vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                        <i className={`fa-solid fa-laptop-file fa-2xl sticky-bottom ${aeroPos ? "d-block" : "d-none"}`} style={{ color: "#000000", cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={handleProjectBacklog} title="Project Backlog"></i>
                        <h6 className={`${aeroPos ? "d-block" : "d-none"}`} style={{marginRight: "45px"}}>Project Backlog</h6>
                    </div>
                    <div className="container d-flex flex-column align-items-end " style={{ position: 'fixed', top: '90vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                        <i
                            className={`fa-solid fa-circle-down fa-2xl ${aeroPos ? "" : "fa-rotate-270"}`}
                            style={{ color: "#000000", cursor: 'pointer' }}
                            title="View Options"
                            onClick={onClickPos}
                        ></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetail