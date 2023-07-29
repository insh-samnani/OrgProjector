import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import organizationContext from "../Context/Organizations/organizationContext"
import { FormControl } from 'react-bootstrap';


import OrganizationItem from './OrganizationItem';
import AddOrganization from './AddOrganization';

const OrganizationHome = (props) => {
    let history = useNavigate();
    const context = useContext(organizationContext);
    const { organizations, getOrganization } = context;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if(localStorage.getItem('tokenn')){
            getOrganization()
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])

    const handleCreateOrganizationClick = () => {
        props.setShowModal(true);
    };

    const filteredOrganizations = organizations.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className={`modal fade ${props.showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor: "#f4e2f7",border: "3px solid #590268", borderRadius: "20px"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color: "#590268", fontSize: "25px"}}>CREATE AN ORGANIZATION</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <AddOrganization showAlert ={props.showAlert}  showModal ={props.showModal} setShowModal = {props.setShowModal} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row my-3">
                <div className="container d-flex flex-column align-items-center" style={{marginBottom: "30px"}}>
                    <h1 style={{ color: "#590268", textShadow: "3px 3px 0 black" }}>ORGANIZATIONS</h1>
                    <div className="row align-items-center" style={{marginTop: "10px"}}>
                        <div className="col-10">
                                <FormControl
                                type="text"
                                placeholder="Search Organization Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    marginBottom: "10px",
                                    borderColor: "none",
                                    color: "black",
                                    backgroundColor: "#f4e2f7",
                                    outline: searchTerm ? '3px solid #590268' : '3px solid black'
                                }}
                                />
                        </div>
                        <div className="col-2">
                            <i className="fa-solid fa-magnifying-glass fa-2xl" style={{color: "#000000", marginBottom: "15px"}}></i>
                        </div>
                    </div>
                </div>

                {filteredOrganizations.map((organization) => (
                    <OrganizationItem key={organization._id} organizations={organization} showAlert={props.showAlert} />
                ))}
                <div className="container d-flex flex-column align-items-end" style={{ position: 'fixed', top:'92vh', right: '3vh', justifyContent: "flex-end", marginTop: "20px" }}>
                    <i className="fa-solid fa-circle-plus fa-2xl sticky-bottom fa-spin" style={{ color: "#000000", cursor: 'pointer' ,fontSize:"6vh"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleCreateOrganizationClick} title="Create Organization"></i>
                </div>
            </div>
        </>
    )
}

export default OrganizationHome