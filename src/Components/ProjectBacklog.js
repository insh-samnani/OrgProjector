import React from 'react'

const ProjectBacklog = (props) => {
    
    return (
        <div style = {{display: "flex", flexDirection: "row"}}>
            <div style = {{flex: "1"}}>
                {props.workitem.backlogitems && props.workitem.backlogitems.map((workitemm) => {
                        return <div key={workitemm._id}>
                            <div>
                                <h4>{props.workitem.project[0].name}</h4>
                                <div>        
                                    <p>Workitem Name: {workitemm.name}</p>
                                    <p>Nature: {workitemm.nature}</p>
                                    <p>State: {workitemm.state}</p>
                                </div>
                            </div>
                        </div>
                })}
            </div>
        </div>
    )
}

export default ProjectBacklog