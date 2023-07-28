import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  let history = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('tokenn');
    history("/");
    
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#590268"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style = {{color: "white"}}>
            GDO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!localStorage.getItem('tokenn')? 
              <>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login" style = {{color: "white"}}>
                  Login
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style = {{color: "white"}}>
                    Signup
                  </Link>
                </li>
              </>
              :
                <button onClick = {handleLogout} className="btn btn-primary"> Logout </button>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
