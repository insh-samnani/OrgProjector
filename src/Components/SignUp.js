import React, { useState } from 'react'
import MainPic from '../Images/2.png'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const [hover, setHover] = useState('')
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", repass: "" })
    const [visiblity, setVisibility] = useState(true)
    const [visiblity1, setVisibility1] = useState(true)
    let history = useNavigate();

    const onSubmitHandler = async (e) => {
        const { firstName, lastName, email, password } = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/User/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });
        const json = await response.json()
        if (json.success) {
            history("/login");
            props.showAlert("You Are Now Our Valued User!!", "success");
        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onHoverHandler = () => {
        setHover('fa-shake');
    };

    const onHoverOutHandler = () => {
        setHover('');
    };

    const passVisiblity = () => {
        setVisibility(!visiblity)
    };

    const passVisiblity1 = () => {
        setVisibility1(!visiblity1)
    };
    const [theme, setTheme] = useState({ color: "white", icon: "fa-lock-open" })
    const changeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if ((e.target.name === "repass" || e.target.name === "password") && credentials["repass"] && credentials["password"]) {
            if (e.target.value === credentials["password"] || e.target.value === credentials["repass"]) {
                setTheme({ color: "#dcf1d8", icon: "fa-lock" })
            }
            else {
                setTheme({ color: "#ffb7b7", icon: "fa-lock-open" })
            }
        }
    }
    return (
        <>
            <div className="card mb-3" style={{backgroundColor:" #725f77",border:"none"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={MainPic} className="img-fluid rounded-start" alt="..." style={{ height: "60vh" }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="mt3 card-text">
                                <h2 style={{ color: "#590268", textShadow: "3px 3px 0 black" }} className="my-3">SignUp</h2>
                                <form onSubmit={onSubmitHandler}>
                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <i className="fa-solid fa-signature mx-2" style={{ color: "black" }}></i>
                                                    <label htmlFor="text" className="form-label">First Name</label>
                                                    <input type="text" className="form-control" name="firstName" id="firstName" value={credentials.firstName} onChange={changeHandler} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <i className="fa-solid fa-signature mx-2" style={{ color: "black" }}></i>
                                                    <label htmlFor="text" className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" name="lastName" id="lastName" value={credentials.lastName} onChange={changeHandler} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mb-3">
                                        <i className="fa-solid fa-envelope mx-2" style={{ color: "black" }}></i>
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={changeHandler} />
                                    </div>


                                    <div className="container">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <div className='d-flex'>
                                                        <div className="p-0 w-100">
                                                            <i className={`fa-solid ${theme.icon} mx-2`} style={{ color: "black" }}></i>
                                                            <label htmlFor="password" className="form-label">Password</label>
                                                        </div>
                                                        <div className="p-0 flex-shrink-1">
                                                            <i className={`fa-solid ${visiblity ? "fa-eye-slash" : "fa-eye"}`} onClick={passVisiblity}></i>
                                                        </div>

                                                    </div>
                                                    <input type={visiblity ? "password" : "text"} className="form-control" name="password" id="password" value={credentials.password} style={{ backgroundColor: theme.color }} onChange={changeHandler} />



                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <div className='d-flex'>
                                                        <div className="p-0 w-100">
                                                            <i className={`fa-solid ${theme.icon} mx-2`} style={{ color: "black" }}></i>

                                                            <label htmlFor="password" className="form-label">Confirm Password</label>
                                                        </div>
                                                        <div className="p-0 flex-shrink-1">
                                                            <i className={`fa-solid ${visiblity1 ? "fa-eye-slash" : "fa-eye"}`} onClick={passVisiblity1}></i>
                                                        </div>

                                                    </div>
                                                    <input type={visiblity1 ? "password" : "text"} className="form-control" name="repass" id="repassword" value={credentials.repass} style={{ backgroundColor: theme.color }} onChange={changeHandler} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{color: "#f4e2f7", backgroundColor: "#590268"}} type="submit" className="btn btn-dark">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <div className='container text-center my-3'>
                <h6>Already a User?</h6>
                <Link to='/login' ><i
                    className={`my-4 fa-solid fa-right-to-bracket ${hover} fa-2xl`}
                    onMouseEnter={onHoverHandler}
                    onMouseLeave={onHoverOutHandler}
                    style={{ color: "black", fontSize: "8vh" }}
                ></i></Link>

            </div>
        </>
    )
}

export default SignUp