import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainPic from '../Images/2.png'



const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/User/LoginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('tokenn', json.authtoken);
            history("/organizationhome");
            props.showAlert("Successfully LogedIn", "success");

        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const [hover, setHover] = useState('')
    const onHoverHandler = () => {
        setHover('fa-shake');
    };

    const onHoverOutHandler = () => {
        setHover('');
    };

    const [visiblity, setVisibility] = useState(true)
    const passVisiblity = () => {
        setVisibility(!visiblity)
    };
    return (
        <>
            <div className="card mb-3" style={{ backgroundColor: " #725f77", border: "none" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={MainPic} className="img-fluid rounded-start" alt="..." style={{ height: "50vh" }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="mt3 card-text">
                                <h2 style={{ color: "#590268", textShadow: "3px 3px 0 black" }} className="my-3">Login To Continue To GDO</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <i className="fa-solid fa-envelope mx-2" style={{ color: "black" }}></i>
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text" style={{ color: "#590268" }}>We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">

                                        <div className='d-flex'>
                                            <div className="p-0 w-100">
                                                <i className="fa-solid fa-lock mx-2" style={{ color: "black" }}></i>

                                                <label htmlFor="password" className="form-label">Password</label>
                                            </div>
                                            <div className="p-2 flex-shrink-1">
                                                <i className={`fa-solid ${visiblity ? "fa-eye-slash" : "fa-eye"}`} onClick={passVisiblity}></i>
                                            </div>

                                        </div>
                                        <input type={visiblity ? "password" : "text"} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                                    </div>

                                    <button type="submit" className="btn btn-dark" style={{ color: "#f4e2f7", backgroundColor: "#590268" }}>Log In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* --------------------- */}
            <div className='container text-center my-3'>
                <h6>Dont't Have an Account?</h6>
                <Link to='/signup'>
                    <i
                        className={`my-4 fa-solid fa-right-to-bracket ${hover} fa-2xl`}
                        onMouseEnter={onHoverHandler}
                        onMouseLeave={onHoverOutHandler}
                        style={{ color: "black", fontSize: "8vh" }}
                    ></i>
                </Link>


            </div>
        </>
    )
}

export default Login