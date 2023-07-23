import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import organizationContext from "../Context/Organizations/organizationContext"


import OrganizationItem from './OrganizationItem';
import AddOrganization from './AddOrganization';

const OrganizationHome = (props) => {
    let history = useNavigate();
    const context = useContext(organizationContext);
    const { organizations, getOrganization } = context;

    useEffect(() => {
        if(localStorage.getItem('tokenn')){
            getOrganization()
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
                            <h5 className="modal-title" id="exampleModalLabel">Create an Organization</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <AddOrganization showAlert ={props.showAlert}  showModal ={props.showModal} setShowModal = {props.setShowModal} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row my-3">
                <h2>Organizations</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => props.setShowModal(true)}>Create an Organization</button>
                {organizations && organizations.map((organization) => {
                    return <OrganizationItem key={organization._id} organizations={organization} showAlert = {props.showAlert} />
                })}
            </div>
        </>
    )
}

export default OrganizationHome