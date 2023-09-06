import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import axios from "axios"
import { useState } from "react"
import "./style.css"
import { toast } from "react-toastify"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/login", {
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
        <h1 className="h1">Login</h1>
        <form className="form" onSubmit={handleLogin}>
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
          <div className="sub-form mb-40">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="mb-10" text="Masuk" />
        </form>
        <p className="direct">
          <small>
            Belum memiliki akun? <Link to="/register">Klik disini</Link>
          </small>
        </p>
      </div>
    </>
  )
}

export default Login
