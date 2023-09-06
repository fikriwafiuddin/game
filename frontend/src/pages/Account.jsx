/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { useEffect, useState } from "react"
import axios from "axios"

function Account() {
  const navigate = useNavigate()
  const [data, setData] = useState("")
  const [click, setClick] = useState(false)
  const token = localStorage.getItem("user")

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const handleLogout = () => {
    confirmAlert({
      title: "Logout",
      message: "Apakah anda yakin untuk Logout?",
      buttons: [
        {
          label: "Iya",
          onClick: () => {
            localStorage.removeItem("user")
            navigate("/")
          },
        },
        {
          label: "Tidak",
          onClick: () => false,
        },
      ],
    })
  }

  useEffect(() => {
    user()
  }, [])

  const user = async () => {
    try {
      const response = await axios.get("http://localhost:5000/game", {
        headers,
      })
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeImg = async (e) => {
    confirmAlert({
      title: "Logout",
      message: "Apakah anda yakin menggantinya?",
      buttons: [
        {
          label: "Iya",
          onClick: async () => {
            try {
              const response = await axios.patch(
                "http://localhost:5000/changeImg",
                {
                  img: e.target.alt,
                },
                {
                  headers,
                }
              )
              if (!response) {
                console.log("Failed change image")
              }
              setClick(false)
              user()
            } catch (error) {
              console.error(error)
            }
          },
        },
        {
          label: "Tidak",
          onClick: () => false,
        },
      ],
    })
  }

  const openEdit = () => {
    setClick(true)
  }

  return (
    <div className="containerA">
      <div className="top">
        <ul className="bio">
          <li>
            <h3 className="user-name">{data.name}</h3>
          </li>
          <li>{data.userId}</li>
          <li>{data.email}</li>
        </ul>
        <div className="photo-profile">
          <img
            className="img"
            src={`http://localhost:5000/${data.img}`}
            alt={data.img}
          />
          <i onClick={openEdit} className="icon bi bi-pencil-square"></i>
        </div>
        <div className="display" style={{ display: click ? "flex" : "none" }}>
          <div className="box-edit">
            <i onClick={openEdit} className="icon bi bi-x-circle"></i>
            <div className="top">
              <img src={`http://localhost:5000/${data.img}`} alt={data.img} />
            </div>
            <div className="bottom">
              <img
                onClick={handleChangeImg}
                src={`http://localhost:5000/1.png`}
                alt={"1.png"}
              />
              <img
                onClick={handleChangeImg}
                src={`http://localhost:5000/2.png`}
                alt={"2.png"}
              />
              <img
                onClick={handleChangeImg}
                src={`http://localhost:5000/3.png`}
                alt={"3.png"}
              />
              <img
                onClick={handleChangeImg}
                src={`http://localhost:5000/4.png`}
                alt={"4.png"}
              />
              <img
                onClick={handleChangeImg}
                src={`http://localhost:5000/5.png`}
                alt={"5.png"}
              />
              <img
                onClick={handleChangeImg}
                src={`http://localhost:5000/6.png`}
                alt={"6.png"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mid">
        <ul>
          <li>
            Penjumlahan 1 : <span className="score">{data.sumLv1}</span>
          </li>
          <li>
            Penjumlahan 2 : <span className="score">{data.sumLv2}</span>
          </li>
          <li>
            Penjumlahan 3 : <span className="score">{data.sumLv3}</span>
          </li>
        </ul>
        <ul>
          <li>
            Pengurangan 1 : <span className="score">{data.subtractionLv1}</span>
          </li>
          <li>
            Pengurangan 2 : <span className="score">{data.subtractionLv2}</span>
          </li>
          <li>
            Pengurangan 3 : <span className="score">{data.subtractionLv3}</span>
          </li>
        </ul>
        <ul>
          <li>
            Perkalian 1 :{" "}
            <span className="score">{data.multiplicationLv1}</span>
          </li>
          <li>
            Perkalian 2 :{" "}
            <span className="score">{data.multiplicationLv2}</span>
          </li>
          <li>
            Perkalian 3 :{" "}
            <span className="score">{data.multiplicationLv3}</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <Link className="back" to={"/"}>
          <i className="bi bi-arrow-left-circle"></i> Kembali
        </Link>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Account
