import WorkitemContext from "./workitemContext";
import { useState } from "react";

const WorkitemState = (props) => {

    const host = "http://localhost:3000"
    const workitemInitial = []
    const [projectWorkitem, setProjectWorkitem] = useState(workitemInitial)
    const [backlog, setBacklog] = useState(workitemInitial)

    const getProjectWorkitem = async (id) => {

        const response = await fetch(`${host}/api/Workitems/ShowProjectWorkItems/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('tokenn')
          },
        });
        const json = await response.json()
        setProjectWorkitem(json)
    }

    const getBacklog = async (id) => {

        const response = await fetch(`${host}/api/Workitems/ShowBacklog/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('tokenn')
          },
        });
        const json = await response.json()
        setBacklog(json)
    }

    const createWorkitem = async (name, nature, projectId) => {

      const response = await fetch(`${host}/api/Workitems/CreateWorkitem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('tokenn')
        },
        body: JSON.stringify({name,nature,projectId})
      });
  
      const workitem = await response.json();
      console.log(workitem)
      getProjectWorkitem(projectId);
      getBacklog(projectId);
    }

    const updateWorkitem = async (workitemId, state, projectId) => {

      const response = await fetch(`${host}/api/Workitems/UpdateStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('tokenn')
        },
        body: JSON.stringify({workitemId, state})
      });
  
      const workitem = await response.json();
      console.log(workitem)
      getBacklog(projectId);
      getProjectWorkitem(projectId);
    }

    return (
        <WorkitemContext.Provider value={{ projectWorkitem, backlog, getProjectWorkitem, getBacklog, createWorkitem, updateWorkitem }}>
            {props.children}
        </WorkitemContext.Provider>
    )

}

export default WorkitemState;