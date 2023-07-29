import React, {useContext, useState} from 'react'
import organizationContext from "../Context/Organizations/organizationContext"

const AddOrganization = (props) => {
    const context = useContext(organizationContext);
    const {addOrganization, getOrganization, addCheck} = context;
    const [organization, setOrganization] = useState({name: "", country: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addOrganization(organization.name, organization.country);
        setOrganization({name: "", country: ""})
        props.setShowModal(false)
        if(addCheck === "Added"){
            props.showAlert("Added Successfully", "success");
        }
        else if(addCheck === "NotAdded"){
            props.showAlert("Organization Already Exist", "danger");
        }
    }

    const onChange = (e)=>{
        setOrganization({...organization, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{color: "#590268", fontSize: "25px"}}>Name</label>
                    <input style={{backgroundColor: "#590268", color: "#f4e2f7"}} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={organization.name} onChange={onChange} minLength={2} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label" style={{color: "#590268", fontSize: "25px"}}>Country</label>
                    <input style={{backgroundColor: "#590268", color: "#f4e2f7"}} type="text" className="form-control" id="country" name="country" value={organization.country} onChange={onChange} minLength={2} required />
                </div>
                <button style={{backgroundColor: "#590268", color: "#f4e2f7"}} disabled={organization.name.length<2 || organization.country.length<2} type="submit" className="btn btn-dark" onClick={handleClick} data-bs-dismiss="modal">Add Organization</button>
            </form>
        </div>
    )
}

export default AddOrganization