import React from 'react'

const OrganizationWorkitem = (props) => {
    
    return (
        <div style = {{display: "flex", flexDirection: "row"}}>
            <div style = {{flex: "1"}}>
                {props.workitem.organizationworkitems && props.workitem.organizationworkitems.map((workitemm) => {
                        return <div key={workitemm.workitems[0]._id}>
                            <div>
                                <h4 style={{color: "#590268"}}>{workitemm.projects[0].name}</h4>
                                <div>        
                                    <p style={{color: "#590268"}}>Workitem Name: {workitemm.workitems[0].name}</p>
                                    <p style={{color: "#590268"}}>Nature: {workitemm.workitems[0].nature}</p>
                                    <p style={{color: "#590268"}}>State: {workitemm.workitems[0].state}</p>
                                </div>
                            </div>
                        </div>
                })}
            </div>
        </div>
    )
}

export default OrganizationWorkitem