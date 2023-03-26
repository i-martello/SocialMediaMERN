import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';

const SingUp = () => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [CorrectPassword, setCorrectPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === confirmPassword) {

      const formData = new FormData()
      formData.append('name', name)
      formData.append('password', password)

      console.log(formData)

      await axios.post('http://localhost:4000/registro', formData,
        { headers: { "Content-Type": "application/json" } }
      )
        .then(async (res) => {
          console.log(res.data)
          setCorrectPassword(res.data.mgs)
          console.log(CorrectPassword)
          if (!res.data.mgs) {
            navigate('/login')
          }
        }
        )
        .catch((err) => {
          setCorrectPassword("Ah occurido un error")
        })

    } else {
      setCorrectPassword('Las contraseñas no coinciden')
    }
  };



  return (
    <div>
      {CorrectPassword && (
        <div className="alert mx-auto col-md-4 mx-auto mt-5 d-flex btn btn-danger cursor-pointer" onClick={() => setCorrectPassword(false)} role="alert">
          {CorrectPassword}
        </div>)
      }
      <div>
        <div className="col-md-3 mx-auto w-40 mt-5">
          <div className="card bg-dark text-light">
            <div className="card-header pt-5">
              <h4 className="text-center">
                Crear tu cuentovich
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name">Usuario:</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    name="name"
                    placeholder="Usuario"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm_password">Confirmar contraseña:</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    name="confirm_password"
                    placeholder="Confirmala bobo"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-success btn-block w-100">
                  Registrarse
                </button>
              </form>
            </div>
            <p className="text-center">Ya tenes una cuenta?
              <Link to="/login" className="text-info">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );

}


export default SingUp