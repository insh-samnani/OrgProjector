import { Link } from 'react-router-dom';
import React from 'react'

const OrganizationItem = (props) => {
    const { organizations } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" title="Further Details" style={{backgroundColor: "#f4e2f7", borderRadius: "13px", border: "3px solid #590268"}}>
                <div>
                    <span className="badge rounded-pill" style={{ display: "flex", justifyContent: "center", position: "absolute", right: "0", width: "22%", backgroundColor: "#590268" }}>{organizations.country}</span>
                </div>
               
                    <div className="card-body container d-flex flex-column align-items-center">
                        <div className='container'>
                            <div className="row">
                                <div className="col-1">
                                    <i className="fa-solid fa-sitemap" style={{color: "#000000"}}></i>
                                </div>
                                <div className="col-11">
                                    <h4 className="card-title" style={{marginLeft: "8px"}}>{organizations.name}</h4>   
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex justify-content-end">
                        <Link to={`/organizationDetail/${organizations._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>  
                            <i className="fa-solid fa-arrow-right-from-bracket fa-beat" ></i>
                        </Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default OrganizationItem