import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/gallery.css'
import axios from 'axios'

const ImgGallery = () => {

  const [image, setImage] = useState([])
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {

    (async () => {
      try {
        const res = await axios.get('http://localhost:4000')
        if(!res.data.token){
        console.log(res.data)
        setImage(res.data)
        }
        console.log(res.data.token);
      } catch (error) {
        console.log("invalido")
      }
    })();
  }, [params.id])


  return (
    <div>
      <div className="Container-gallery">
        {image.map(item => {
          return (
            <article className="articleGallery card-image" key={item._id} onClick={()=> navigate(`/imagenes/${item.cloud_id}`)}>
                <div className="articleImage">
                  <img src={item.url} alt="" className="articleImg" />
                  <div className="titleImage">
                    <label>{item.title}</label>
                  </div>
                </div>
            </article>

          );
        })}
      </div>
    </div>
  );
}

export default ImgGallery