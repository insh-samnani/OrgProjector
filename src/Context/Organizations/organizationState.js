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
    console.warn(json);
    setOrganizations(json)
  }

  return (
    <OrganizationContext.Provider value={{ organizations, getOrganization }}>
      {props.children}
    </OrganizationContext.Provider>
  )

}

export default OrganizationState;