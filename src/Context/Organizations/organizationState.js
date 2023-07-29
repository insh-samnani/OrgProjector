import OrganizationContext from "./organizationContext";
import { useState } from "react";

const OrganizationState = (props) => {
  const host = "http://localhost:3000"
  const organizationInitial = []
  const [organizations, setOrganizations] = useState(organizationInitial)
  const [organizationWorkitem, setOrganizationWorkitem] = useState(organizationInitial)
  const [addCheck, setAddCheck] = useState('')

  const getOrganization = async () => {
    
    const response = await fetch(`${host}/api/Organizations/ViewOrganization`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
    });
    const json = await response.json()
    setOrganizations(json)
  }

  const addOrganization = async (name, country) => {

    const response = await fetch(`${host}/api/Organizations/CreateOrganization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
      body: JSON.stringify({name, country})
    });

    const organization = await response.json();
    
    if(organization.success){
      setAddCheck("Added");
      setOrganizations(organizations.concat(organization.saveOrganization));
    }
    else{
      setAddCheck("NotAdded");
    }
  }

  const getOrganizationWorkitem = async (id) => {

    const response = await fetch(`${host}/api/Workitems/ShowOrganizationWorkItems/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
    });
    const json = await response.json()
    setOrganizationWorkitem(json)
  }

  return (
    <OrganizationContext.Provider value={{ organizations, organizationWorkitem, addCheck, getOrganization, addOrganization, getOrganizationWorkitem }}>
      {props.children}
    </OrganizationContext.Provider>
  )

}

export default OrganizationState;