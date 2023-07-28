import React, {useContext, useState} from 'react'
import organizationContext from "../Context/Organizations/organizationContext"

const AddOrganization = (props) => {
    const context = useContext(organizationContext);
    const {addOrganization, addCheck} = context;
    const [organization, setOrganization] = useState({name: "", country: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addOrganization(organization.name, organization.country);
        setOrganization({name: "", country: ""})
        props.setShowModal(false)
        if(addCheck){
            props.showAlert("Added Successfully", "success");
        }
        else{
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={organization.name} onChange={onChange} minLength={2} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" value={organization.country} onChange={onChange} minLength={2} required />
                </div>
                <button disabled={organization.name.length<2 || organization.country.length<2} type="submit" className="btn btn-dark" onClick={handleClick} data-bs-dismiss="modal">Add Organization</button>
            </form>
        </div>
    )
}

export default AddOrganization