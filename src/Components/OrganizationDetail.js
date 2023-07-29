import React, { useContext, useEffect, useState } from 'react'
import projectContext from "../Context/Projects/projectContext"
import organizationContext from "../Context/Organizations/organizationContext"
import { useParams, useNavigate } from 'react-router-dom';

import AddProject from './AddProject';
import ProjectItem from './ProjectItem';
import JoinProject from './JoinProject';
import OrganizationWorkitem from './OrganizationWorkitem';
import OrganizationPane from './OrganizationPane';

const OrganizationDetail = (props) => {

    const { id } = useParams();

    let history = useNavigate();
    const context = useContext(projectContext);
    const context2 = useContext(organizationContext);
    const { projects, organizations, organization, getProject } = context;
    const { getOrganizationWorkitem, organizationWorkitem } = context2;

    useEffect(() => {
        if (localStorage.getItem('tokenn')) {
            getProject(id);
            getOrganizationWorkitem(id);
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

    const handleCreateProjectClick = () => {
        props.setShowModal(true);
    };

    const handleJoinProjectClick = () => {
        props.setShowModal(true);
    };

    const handleViewWorkitem = () => {
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
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color: "#590268", fontSize: "25px" }}>CREATE A PROJECT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <AddProject showAlert={props.showAlert} id={organization._id} setShowModal={props.setShowModal} showModal={props.showModal} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color: "#590268", fontSize: "25px" }}>JOIN A PROJECT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)} ></button>
                        </div>
                        <div className="modal-body">
                            <JoinProject showAlert={props.showAlert} setShowModal={props.setShowModal} showModal={props.showModal} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#f4e2f7", border: "3px solid #590268", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color: "#590268", fontSize: "25px" }}>ORGANIZATION WORKITEMS</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)} ></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <OrganizationWorkitem showAlert={props.showAlert} workitem={organizationWorkitem} />
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
                    <div className="container d-flex flex-column align-items-center">
                        <h1 style={{ color: "#590268", textShadow: "3px 3px 0 black" }}>PROJECTS</h1>
                        <h2 style={{ color: "black", textShadow: "2px 2px 0 #590268" }}>{organization.name}</h2>
                        <h3 style={{ color: "black", textShadow: "2px 2px 0 #590268" }}>{organization.country}</h3>
                    </div>
                    <div className="row">
                        {projects && projects.map((project) => {
                            return <>
                                <div className="col-md-4">
                                    <ProjectItem key={project._id} projects={project} showAlert={props.showAlert} />
                                </div>
                            </>
                        })}
                    </div>
                    <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top: '80vh', right: '3vh', justifyContent: "flex-end", marginTop: "20px" }}>
                        <i className={`fa-solid fa-circle-plus fa-2xl sticky-bottom ${aeroPos ? "d-block" : "d-none"}`} style={{ color: "#000000", cursor: 'pointer', fontSize: "6vh" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleCreateProjectClick} title="Create Project"></i>
                        <h6 className={`${aeroPos ? "d-block" : "d-none"}`} style={{marginRight: "45px"}}>Create Project</h6>
                    </div>
                    <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top: '70vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                        <i className={`fa-solid fa-users-viewfinder fa-2xl sticky-bottom ${aeroPos ? "d-block" : "d-none"}`} style={{ color: "#000000", cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={handleJoinProjectClick} title="Join Project"></i>
                        <h6 className={`${aeroPos ? "d-block" : "d-none"}`} style={{marginRight: "45px"}}>Join Project</h6>
                    </div>
                    {organizationWorkitem.organizationworkitems && organizationWorkitem.organizationworkitems.length > 0 ? (
                        <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top: '60vh', right: '4vh', justifyContent: "flex-end", marginTop: "20px" }}>
                            <i className={`fa-solid fa-briefcase fa-2xl sticky-bottom ${aeroPos ? "d-block" : "d-none"}`} style={{ color: "#000000", cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={handleViewWorkitem} title="View Workitem"></i>
                            <h6 className={`${aeroPos ? "d-block" : "d-none"}`} style={{marginRight: "45px"}}>My Workitems</h6>
                        </div>
                    ) : (
                        null
                    )}
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

export default OrganizationDetail