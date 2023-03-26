import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom';

const ImgDetails = () => {

  const [comment, setComment] = useState('')

  const [image, setImage] = useState({})

  const [result, setResult] = useState([])

  const [User, setUser] = useState('')

  const params = useParams();



  useEffect(() => {

    (async () => {
      const res = await axios.get(`http://localhost:4000/imagenes/${params.id}`)
      setImage(res.data.oneImage)
      setUser(res.data.user)
      console.log(User)
    })();

  }, [params.id, User])


  useEffect(() => {
    (async()=>{
      const res = await axios.get(`http://localhost:4000/imagenes/${params.id}/comment`)
      setResult(res.data)
    })()
  }, [params.id, result])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(params.id)
    console.log("hola");

    const formData = new FormData();
    formData.append('comment', comment)
    
    const res = await axios.post(`http://localhost:4000/imagenes/${params.id}/comment`, formData,
      { headers: { 'Content-Type': 'application/json' } })
    console.log(res);
  }




  const handleDelete = async () => {

    await axios.delete(`http://localhost:4000/imagenes/${params.id}`)
    
  }


  return (
    <div className="Container-ImgDetails">
      <div className="row Image-Container">
        <div className="">
          <div className="card bg-dark">
            <img src={image.url} alt={image.title} className="card-img-top" />
            <div className="card-body">
              <h3>{image.title}</h3>
              {User && <button className="btn btn-outline-danger" onClick={handleDelete}>Borrar</button>}
            </div>
          </div>
        </div>
      </div>
      <div className="Comments-Container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="Container-Input">
              <input type="text" className="Input" placeholder="Introduce tu comentario" onChange={(e) => setComment(e.target.value)} />
              <div className="container-button">
                <input type="submit" className="boton" value="Enviar"/>
              </div>
            </div>
          </form>
            <div>
              {result.map(image => {
                return (
                  <article key={image._id} className="Comments">
                    <div className="Container-Img">
                      <img src="https://res.cloudinary.com/dkqlhd9l3/image/upload/v1677444056/icono_b7nth9.png" alt=""></img>
                    </div>
                    <div className="Container-Label">
                      <label>{image.comment}</label>
                    </div>
                  </article>
                )
              })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ImgDetails