import React from 'react'

const OrganizationItem = (props) => {
    const { organizations } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{organizations.name}</h5>
                    </div>
                    <p className="card-text">{organizations.country}</p>

                </div>
            </div>
        </div>
    )
}

export default OrganizationItem