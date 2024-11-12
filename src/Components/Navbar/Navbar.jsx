import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthServices";

export default function Navbar() {
  let { userData, logOut } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <div>
              <b>CourSaty</b>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/courses"}>
                      Courses
                    </Link>
                  </li>
                  {userData.roles.includes("Admin") && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/dashboard"}>
                          dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/categeorie"}>
                          categeorie
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}

              {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> */}
            </ul>
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!userData ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>
                        Hello {userData.sub}
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link className="nav-link" to={"/login"}>
                        <i className="fa fa-bell"></i>
                      </Link>
                    </li> */}

                    <div class="dropdown">
                      <button
                        class="btn btn-secondary bg-transparent border-0 "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-bell"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to={""}>
                            Action
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logOut} to={"/login"}>
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
