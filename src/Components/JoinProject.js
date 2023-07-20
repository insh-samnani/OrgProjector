import React, {useContext, useState} from 'react'
import projectContext from "../Context/Projects/projectContext"

const JoinProject = (props) => {
    const context = useContext(projectContext);
    const {joinProject, message} = context;
    const [key, setKey] = useState(0)

    const handleClick = (e)=>{
        e.preventDefault();
        joinProject(key);
        setKey(0)
        if(message === "joined"){
            props.showAlert("Joined Successfully", "success");
        }
        else if(message === "not"){
            props.showAlert("Invalid Key", "danger");
        }
        else{
            props.showAlert("Already Joined", "danger");
        }
    }

    const onChange = (e)=>{
        setKey(e.target.value)
    }
    return (
        <div className="container my-3">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="key" className="form-label">Key</label>
                    <input type="text" className="form-control" id="key" name="key" aria-describedby="emailHelp" value={key} onChange={onChange} minLength={5} required /> 
                </div>
                <button disabled={key.length<5} type="submit" className="btn btn-dark" onClick={handleClick}>Join Project</button>
            </form>
        </div>
    )
}

export default JoinProject