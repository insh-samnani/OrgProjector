import React from 'react'

const OrganizationWorkitem = (props) => {
    
    return (
        <div style = {{display: "flex", flexDirection: "row"}}>
            <div style = {{flex: "1"}}>
                {props.workitem.organizationworkitems && props.workitem.organizationworkitems.map((workitemm) => {
                        return <div key={workitemm.workitems[0]._id}>
                            <div>
                                <h4>{workitemm.projects[0].name}</h4>
                                <div>        
                                    <p>Workitem Name: {workitemm.workitems[0].name}</p>
                                    <p>Nature: {workitemm.workitems[0].nature}</p>
                                    <p>State: {workitemm.workitems[0].state}</p>
                                </div>
                            </div>
                        </div>
                })}
            </div>
        </div>
    )
}

export default OrganizationWorkitem