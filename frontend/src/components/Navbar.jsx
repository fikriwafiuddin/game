/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function Navbar(props) {
  const isLogin = props.isLogin
  return (
    <nav>
      <div className="logo">Game</div>
      <div className="icons">
        {isLogin ? (
          <>
            <Link className="icon">
              <i className="bi bi-headset"></i>
            </Link>
            <Link to={"/me"} className="icon">
              <i className="bi bi-person-circle"></i>
            </Link>
          </>
        ) : (
          <>
            <Link className="icon" to={"/login"}>
              Login
            </Link>
            <Link className="icon" to={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
