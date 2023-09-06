import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { conTitle } from "../functions/functions"
import { toast } from "react-toastify"

function Game() {
  const [operator, setOperator] = useState("")
  const [numbers, setNumbers] = useState(null)
  const [options, setOptions] = useState([])
  const [result, setResult] = useState("")
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [point, setPoint] = useState(null)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [title, setTitle] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const token = localStorage.getItem("user")

  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const path = window.location.pathname

  useEffect(() => {
    if (token) {
      setIsLogin(true)
    }
    setTitle(() => conTitle(path))
    user()
    if (path.includes("sum")) {
      setOperator("+")
    } else if (path.includes("subtraction")) {
      setOperator("-")
    } else if (path.includes("multiplication")) {
      setOperator("x")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const countdownInterval = setInterval(async () => {
      if (time > 0) {
        setTime((time) => time - 1)
      }
      if (time === 0) {
        clearInterval(countdownInterval)
        setNumbers(null)
        await axios.patch(
          "http://localhost:5000/savePoint",
          {
            path: path.replace("/", ""),
            point,
          },
          {
            headers,
          }
        )
        if (point > score) {
          toast.success("🏆 Hight score", {
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
        user()
      }
    }, 1000)

    return () => {
      clearInterval(countdownInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const user = async () => {
    try {
      const response = await axios.get("http://localhost:5000/game", {
        headers,
      })
      setName(response.data.name)
      setScore(response.data[path.replace("/", "")])
      setId(response.data.userId)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000${path}`, {
        headers,
      })
      if (response.data.options === undefined) {
        return fetchQuestion()
      }
      return response.data
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleSubmit = async (e) => {
    const submit = e
    if (submit === result) {
      const response = await fetchQuestion()
      if (response && response.numbers && response.options && response.result) {
        setNumbers(response.numbers)
        setOptions(response.options)
        setResult(response.result)
      }
      setPoint(point + 1)
      setTime(30)
    } else if (submit !== result) {
      setNumbers(null)
      setTime(0)
      await axios.patch(
        "http://localhost:5000/savePoint",
        {
          path: path.replace("/", ""),
          point,
        },
        {
          headers,
        }
      )
    }
  }

  const handleButtonClick = async () => {
    const response = await fetchQuestion()
    if (response && response.numbers && response.options && response.result) {
      setNumbers(response.numbers)
      // setQuestion(response)
      setOptions(response.options)
      setResult(response.result)
    }
    setTime(30)
    setPoint(0)
  }

  return (
    <>
      <Navbar isLogin={isLogin} />
      <div className="container">
        <div className="side">
          <div className="hight-score">
            <h3>Poin Tertinggi</h3>
            <div className="trophy">
              <i className="bi bi-trophy"></i>
            </div>
            <div className="point">{score}</div>
          </div>
          <p className="version">v 3.0</p>
        </div>
        <div className="game">
          <h3>Halo {name}</h3>
          <h4 className="id">id: {id}</h4>
          <h1>{title}</h1>

          {numbers === null ? (
            <>
              <button className="start" onClick={handleButtonClick}>
                Mulai
              </button>
              {point !== null && (
                <div className="point">
                  {point} <div className="explanatory">POINT</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="numbers">
                <h5 className="timer">{time}</h5>
                <div className="number">{numbers[0]}</div>
                <div className="operator">{operator}</div>
                <div className="number">{numbers[1]}</div>
                <div className="operator">{operator}</div>
                <div className="number">{numbers[2]}</div>
                <div className="operator">{operator}</div>
                <div className="number">{numbers[3]}</div>
                <div className="operator">{operator}</div>
                <div className="number">{numbers[4]}</div>
              </div>
              <h2>=</h2>
              <div className="options">
                {typeof options !== typeof [] ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    {options.map((number, i) => (
                      <button
                        onClick={() => handleSubmit(number)}
                        className="option"
                        key={i}
                        value={number}
                      >
                        {number}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
          <Link className="back" to={"/"}>
            <i className="bi bi-arrow-left-circle"></i> Kembali
          </Link>
        </div>
      </div>
    </>
  )
}

export default Game
