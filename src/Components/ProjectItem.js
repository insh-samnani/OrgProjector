import { Link } from 'react-router-dom';
import React from 'react'

const ProjectItem = (props) => {
    const { projects } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3" title="Further Details">
                    <div className="card-body container d-flex flex-column align-items-center">
                        <div className='container'>
                            <div className="row">
                                <div className="col-1">
                                    <i className="fa-solid fa-sheet-plastic fa-lg" style={{color: "#000000"}}></i>
                                </div>
                                <div className="col-11">
                                    <h4 className="card-title" style={{marginLeft: "8px"}}>{projects.name}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex justify-content-end">
                        <Link to={`/projectDetail/${projects._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>  
                            <i className="fa-solid fa-arrow-right-from-bracket fa-beat" ></i>
                        </Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProjectItem;