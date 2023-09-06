/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function Home() {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [rank, setRank] = useState([])
  const [category, setCategory] = useState("sumLv1")
  const token = localStorage.getItem("user")

  useEffect(() => {
    if (token) {
      setIsLogin(true)
      user(token)
    }
  }, [])

  const user = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/game", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setName(response.data.name)
      setId(response.data.userId)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getRank = async () => {
      try {
        const response = await axios.get("http://localhost:5000/ranking")
        setRank(response.data)
        if (!response) {
          console.error("Error fetching data: ")
        }
      } catch (error) {
        console.error("error", error)
      }
    }
    getRank()
  }, [])

  const HandleToGame = (props) => {
    const handleClick = () => {
      if (!isLogin) {
        toast.warn("Anda belum login", {
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
    return (
      <Link
        onClick={handleClick}
        to={isLogin ? props.path : "/login"}
        className="box"
      >
        {props.text}
      </Link>
    )
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  return (
    <>
      <Navbar isLogin={isLogin} />
      <div className="container">
        <div className="side">
          <h3>Peringkat</h3>
          <div className="leaderboard">
            <form className="category">
              <label htmlFor="category">
                <i className="bi bi-list"></i>
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
              >
                <option value="sumLv1">Penjumlahan Level 1</option>
                <option value="sumLv2">Penjumlahan Level 2</option>
                <option value="sumLv3">Penjumlahan Level 3</option>
                <option value="subtractionLv1">Pengurangan Level 1</option>
                <option value="subtractionLv2">Pengurangan Level 2</option>
                <option value="subtractionLv3">Pengurangan Level 3</option>
                <option value="multiplicationLv1">Perkalian Level 1</option>
                <option value="multiplicationLv2">Perkalian Level 2</option>
                <option value="multiplicationLv3">Perkalian Level 3</option>
              </select>
            </form>
            {rank.length === 0 ? (
              <div className="loading-spinner"></div>
            ) : (
              rank[category].map((data, i) => (
                <div className="box" key={data.userId}>
                  <div className="photo">
                    <img
                      className="img"
                      src={`http://localhost:5000/${data.img}`}
                      alt={data.img}
                    />
                  </div>
                  <div className="player">
                    <span className="name-player">
                      {i + 1}. {data.name}
                    </span>
                    <span className="score-player">{data.score}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <p className="version">v 3.0</p>
        </div>
        <main className="main">
          {isLogin == true && (
            <>
              <h3>Halo {name}</h3>
              <h4>id: {id}</h4>
            </>
          )}

          <h1>Pilih Mode Game</h1>
          <div className="boxes">
            <HandleToGame path={"/sumLv1"} text={"Penjumlahan Level 1"} />
            <HandleToGame path={"/sumLv2"} text={"Penjumlahan Level 2"} />
            <HandleToGame path={"/sumLv3"} text={"Penjumlahan Level 3"} />
            <HandleToGame
              path={"/subtractionLv1"}
              text={"Pengurangan Level 1"}
            />
            <HandleToGame
              path={"/subtractionLv2"}
              text={"Pengurangan Level 2"}
            />
            <HandleToGame
              path={"/subtractionLv3"}
              text={"Pengurangan Level 3"}
            />
            <HandleToGame
              path={"/multiplicationLv1"}
              text={"Perkalian Level 1"}
            />
            <HandleToGame
              path={"/multiplicationLv2"}
              text={"Perkalian Level 2"}
            />
            <HandleToGame
              path={"/multiplicationLv3"}
              text={"Perkalian Level 3"}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
