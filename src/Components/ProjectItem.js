import React from 'react'

const ProjectItem = (props) => {
    const { projects } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{projects.name}</h5>
                    </div>
                    {/* <p className="card-text">{projects.country}</p> */}
                    {/* <button type="button" className="btn btn-dark" onClick={() => window.location.href = `/organizationDetail/${projects._id}`}>Go to {projects.name}</button> */}
                </div>
            </div>
        </div>
    )
}

export default ProjectItem;