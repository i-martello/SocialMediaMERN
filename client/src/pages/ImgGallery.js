import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/gallery.css";
import axios from "axios";

const ImgGallery = () => {
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000");
        if (!res.data.token) {
          setImage(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.id]);

  const handleClick = (item) => {
    navigate(`/imagenes/${item.cloud_id}`)
    window.location.reload();
  }

  return (
    <div>
      <div className="Container-gallery">
        {image.map((item) => {
          return (
            <article
              className="articleGallery card-image"
              key={item._id}
              onClick={() => handleClick(item)}
            >
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
};

export default ImgGallery;
