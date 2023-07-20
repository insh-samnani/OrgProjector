import React from 'react'

const OrganizationItem = (props) => {
    const { organizations } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{organizations.name}</h5>
                    </div>
                    <p className="card-text">{organizations.country}</p>
                    <button type="button" className="btn btn-dark" onClick={() => window.location.href = `/organizationDetail/${organizations._id}`}>Go to {organizations.name}</button>
                </div>
            </div>
        </div>
    )
}

export default OrganizationItem