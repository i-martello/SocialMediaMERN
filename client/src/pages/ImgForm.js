import React, { useState } from 'react'
import axios from 'axios'


const ImgForm = () => {

  const [file, setFile] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData();

    formData.append('Value', file);
    formData.append('title', title);
    formData.append('description', description);

    const res = await axios.post('http://localhost:4000/publicar', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress(progressEvent) {
        const { loaded, total } = progressEvent
        const percent = parseInt((loaded * 100) / total)
        setUploadPercentage(percent)
        console.log(percent)
      }
    })

    console.log(res)
  }

  return (
    
    <div className='col-md-4 offset-md-4 mt-5'>
      { loading && (
      <div className='progress rounded-0'>
        <div
          className='progress-bar bg-success'
          role="progressbar"
          style={{ width: `${uploadPercentage}%` }}
        ></div>
      </div>)
      }

      <div className='card bg-dark text-light rounded-0 p-4'>
        <div className='card-body'>
          <h3>Rompete ese post</h3>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className='form-control bg-dark text-light my-3 rounded-0'
              placeholder='Ponele titulo a la virgada'
              onChange={e => setTitle(e.target.value)}
            />
            <input type='text'
              className='form-control bg-dark text-light my-3 rounded-0'
              placeholder='Mandale texto compa'
              onChange={e => setDescription(e.target.value)} />
            <input type='file'
              className='form-control bg-dark text-light rounded-0'
              onChange={handleChange}
              placeholder='Descripcion'
            />
            <div className='my-3'></div>
            <div className='my-3'>
              <button className='btn btn-success rounded-0 w-100'>
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ImgForm