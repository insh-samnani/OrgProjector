import React, {useContext, useState, useEffect} from 'react'
import projectContext from "../Context/Projects/projectContext"

const InviteMember = (props) => {
    const context = useContext(projectContext);
    const {inviteMember, emailMessage} = context;
    const [member, setMember] = useState({email: ""})

    useEffect(() => {
        if(emailMessage === "Done"){
            props.showAlert("Emailed Successfully", "success");
        }
        else if(emailMessage === "NotDone"){
            props.showAlert("Invalid Email", "danger");
        }
        // eslint-disable-next-line
    }, [emailMessage])

    const handleClick = (e)=>{
        e.preventDefault();
        inviteMember(props.projectId, member.email);
        setMember({email: ""})
        props.setShowModal(false)
    }

    const onChange = (e)=>{
        setMember({...member, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={member.email} onChange={onChange} minLength={10} required /> 
                </div>
                <button disabled={member.email.length<10} type="submit" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleClick}>Invite</button>
            </form>
        </div>
    )
}

export default InviteMember