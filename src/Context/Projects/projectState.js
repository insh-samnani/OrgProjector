import ProjectContext from "./projectContext";
import { useState } from "react";

const ProjectState = (props) => {
  const host = "http://localhost:3000"
  const projectInitial = []
  const [projects, setProjects] = useState(projectInitial)
  const [organizations, setOrganizations] = useState(projectInitial)
  const [organization, setOrganization] = useState(projectInitial)
  const [message, setMessage] = useState('')
  const [oneProject, setOneProject] = useState('')
  const [projectMembers, setProjectMembers] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const getOneProject = async (id) => {
    
    const response = await fetch(`${host}/api/Projects/oneProject/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      }
    });
    const json = await response.json()
    setOneProject(json);
  }

  const getProjectMembers = async (id) => {
    
    const response = await fetch(`${host}/api/Projects/ViewProjectMembers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      }
    });
    const json = await response.json()
    setProjectMembers(json);
  }

  const getProject = async (id) => {
    
    const response = await fetch(`${host}/api/Organizations/viewOrganizationProject/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
    });
    const json = await response.json()
    setProjects(json.organizationprojects[0].projects)
    setOrganizations(json.organizations)
    setOrganization(json.organization[0])
  }

  const inviteMember = async (projectId, email) => {
    
    const response = await fetch(`${host}/api/Projects/InviteMember`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
      body: JSON.stringify({projectId, email})
    });
    const result = await response.json();
    if(result.message === "Emailed Successfully"){
      setEmailMessage("Done")
    }
    else if(result.message === "Email Not Exist"){
      setEmailMessage("NotDone")
    }
  }

  const addProject = async (name, id) => {

    const response = await fetch(`${host}/api/Projects/CreateProject/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
      body: JSON.stringify({name})
    });

    const project = await response.json();
    setProjects(projects.concat(project))
  }

  const joinProject = async (key) => {

    const response = await fetch(`${host}/api/Projects/JoinProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('tokenn')
      },
      body: JSON.stringify({key})
    });

    const project = await response.json();
    if(!project.success && project.message === "No Project With This Key"){
      setMessage("not")
    }
    else if(!project.success && project.message === "Already Joined"){
      setMessage("already")
    }
    else if(project.success){
      setMessage("joined")
    }
  }

  return (
    <ProjectContext.Provider value={{ projects, organizations, organization, message, oneProject, projectMembers, emailMessage, getProject, addProject, joinProject, getOneProject, getProjectMembers, inviteMember }}>
      {props.children}
    </ProjectContext.Provider>
  )

}

export default ProjectState;