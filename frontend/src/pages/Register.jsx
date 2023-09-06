import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import "./style.css"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      })
      localStorage.setItem("user", response.data.token)
      navigate("/")
    } catch (error) {
      if (error.response) {
        return toast.warn(error.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        })
      }
    }
  }

  return (
    <>
      <div className="form-container">
        <h1 className="h1">Register</h1>
        <form className="form" onSubmit={handleRegister}>
          <div className="sub-form">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              max={7}
            />
          </div>
          <div className="sub-form">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sub-form">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="sub-form mb-40">
            <label className="form-label">Konfirmasi Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <Button text="Buat" />
        </form>
        <p className="direct">
          <small>
            Sudah memiliki akun? <Link to="/login">Klik disini</Link>
          </small>
        </p>
      </div>
    </>
  )
}
