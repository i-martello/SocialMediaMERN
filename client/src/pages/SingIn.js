import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const SingIn = () => {
  const { setSession } = useGlobalContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/login",
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const { data } = response;
        if (!data.mensaje) {
          setSession(true);
          navigate(`/`);
        } else {
          setError(data.mensaje);
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {error && (
        <div
          className="alert mx-auto col-md-4 mx-auto mt-5 d-flex btn btn-danger cursor-pointer"
          onClick={() => setError(false)}
          role="alert"
        >
          {error}
        </div>
      )}
      <div>
        <div className="col-md-3 mx-auto w-10">
          <div className="card mt-5 text-white rounded">
            <div className="card-header text-center pt-5">
              <h1 className="h4 text-white">Iniciar Sesión</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="email">Usuario:</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    name="name"
                    placeholder="Usuario"
                    autofocus
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="passswore">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-success btn-block w-100">
                  Login
                </button>
              </form>
            </div>
            <p className="text-center">
              No tenes una cuenta?{" "}
              <Link to="/registro" className="text-info">
                Registrarse
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
