import React, { useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { GoSignIn } from 'react-icons/go'
import { Link} from "react-router-dom";
import { AiOutlineUserAdd } from 'react-icons/ai'
import { FiUpload } from 'react-icons/fi'
import axios from "axios";
import { useGlobalContext } from "../context";

const Navbar = () => {

  const {session, setSession} = useGlobalContext()

  const logout =  async () => {
    console.log("hola");
    await axios.get('http://localhost:4000/logout', {withCredentials: true})
    setSession(false)
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PopaWeb</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-auto px-4">
            {!session && (
              <>
                <li className="nav-item">
                  <Link className="btn border-0 nav-link active TEXT" to='/registro' onClick={logout}><AiOutlineUserAdd></AiOutlineUserAdd>&nbsp;&nbsp;&nbsp;Registrarse
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn border-0 nav-link active TEXT" to='/login' onClick={logout}><MdOutlineLogin></MdOutlineLogin>&nbsp;&nbsp;&nbsp;Login
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              </>
            )}
            {session &&
              <>
                <li className="nav-item">
                  <Link className="nav-link active TEXT" to="/publicar"><FiUpload></FiUpload>&nbsp;&nbsp;&nbsp;Publicar
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="btn border-0 nav-link active cursor-pointer TEXT" onClick={logout}><GoSignIn></GoSignIn>&nbsp;&nbsp;&nbsp;Salir
                    <span className="visually-hidden">(current)</span>
                  </div>
                </li>
              </>
            }

          </ul>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar 