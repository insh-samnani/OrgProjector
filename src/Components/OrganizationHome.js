import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import organizationContext from "../Context/Organizations/organizationContext"
import OrganizationItem from './OrganizationItem';

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
            <div className="row my-3">
                <h2>Organizations</h2>
                {organizations.map((organization) => {
                    return <OrganizationItem key={organization._id} organizations={organization} showAlert = {props.showAlert} />
                })}
            </div>
        </>
    )
}

export default OrganizationHome