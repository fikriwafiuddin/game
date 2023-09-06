import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Account from "./pages/Account"
import "react-confirm-alert/src/react-confirm-alert.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:mode" element={<Game />} />
          <Route path="/me" element={<Account />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
