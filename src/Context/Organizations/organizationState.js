import OrganizationContext from "./organizationContext";
import { useState } from "react";

const OrganizationState = (props) => {
  const host = "http://localhost:3000"
  const organizationInitial = []
  const [organizations, setOrganizations] = useState(organizationInitial)

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
    setOrganizations(organizations.concat(organization))
  }

  return (
    <OrganizationContext.Provider value={{ organizations, getOrganization, addOrganization }}>
      {props.children}
    </OrganizationContext.Provider>
  )

}

export default OrganizationState;