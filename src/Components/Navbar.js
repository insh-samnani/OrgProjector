import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  let history = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('tokenn');
    history("/");
    
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" style={{backgroundColor: "#590268"}}>
        <div className="container-fluid">
          <div>
            <i className="fa-solid fa-sitemap fa-lg" style={{color: "#000000"}}></i>
            <a className="navbar-brand" href="/" style = {{color: "#f4e2f7", marginLeft: "5px"}}>
              GDO
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars  fa-xl navbar-toggle-icon" style={{color: "#f4e2f7"}}></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!localStorage.getItem('tokenn')? 
              <>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login" style = {{color: "#f4e2f7"}}>
                  Login
                </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style = {{color: "#f4e2f7"}}>
                    Signup
                  </Link>
                </li>
              </>
              :
                <button onClick = {handleLogout} className="btn btn-primary" style={{backgroundColor: "#f4e2f7", color: "#590268"}}> Logout </button>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
