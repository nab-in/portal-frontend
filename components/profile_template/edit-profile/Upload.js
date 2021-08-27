import { useState } from "react"
import { config } from "../../config"
import axios from "axios"
import { FaCamera } from "react-icons/fa"
import { API, BACKEND } from "../../api"
import { useAuthDispatch } from "../../../context/auth"
import { useAlertsDispatch } from "../../../context/alerts"
import styles from "./upload.module.sass"

const Upload = ({ details, setDetails, dp, name, page }) => {
  const dispatch = useAuthDispatch()
  const alertDispatch = useAlertsDispatch()
  name = name.split("")[0]
  let [imgData, setImgData] = useState(null)

  const handleChange = (e) => {
    if (e.target.files) {
      const reader = new FileReader()
      const data = new FormData()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])

      // uploading file
      data.append("", e.target.files[0])
      if (page == "auth-user")
        axios
          .post(`${API}/users/dp`, data, config)
          .then((res) => {
            dispatch({
              type: "ADD_DP",
              payload: res.data,
            })
            alertDispatch({
              type: "ADD",
              payload: {
                type: "success",
                message: res.data.message,
              },
            })
          })
          .catch((err) => {
            alertDispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err.response?.data?.message,
              },
            })
          })
      if (page == "company") {
        axios
          .post(`${API}/companies/${details?.id}/logo`, data, config)
          .then((res) => {
            console.log(res.data)
            setDetails({ ...details, logo: BACKEND + res.data?.path })
            alertDispatch({
              type: "ADD",
              payload: {
                type: "success",
                message: res.data.message,
              },
            })
          })
          .catch((err) => {
            console.log(err)
            alertDispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err.response?.data?.message,
              },
            })
          })
      }
    }
  }

  return (
    <div className={styles.img__upload}>
      <form>
        <label htmlFor="img-upload">
          <input
            type="file"
            id="img-upload"
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.img__container}>
            <div className={styles.img__cover}></div>
            {imgData ? (
              <img src={imgData} alt="newly uploaded" />
            ) : (
              <>
                {dp ? (
                  <img src={dp} alt="dp" />
                ) : (
                  <div className={styles.default}>{name}</div>
                )}
              </>
            )}
            <FaCamera className={styles.icon} />
          </div>
        </label>
      </form>
    </div>
  )
}

export default Upload
