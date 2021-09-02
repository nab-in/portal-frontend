import { useState } from "react"
import { config } from "../../config"
import axios from "axios"
import { FaCamera } from "react-icons/fa"
import { API, BACKEND } from "../../api"
import { useAuthDispatch } from "../../../context/auth"
import { useAlertsDispatch } from "../../../context/alerts"
import Spinner from "../../loaders/ButtonLoader"
import styles from "./upload.module.sass"

const Upload = ({ details, setDetails, dp, name, page }) => {
  const dispatch = useAuthDispatch()
  const alertDispatch = useAlertsDispatch()
  name = name?.split("")[0]
  let [imgData, setImgData] = useState(null)
  let [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    if (e.target.files) {
      const reader = new FileReader()
      const data = new FormData()
      if (
        e.target.files[0]?.type == "image/png" ||
        e.target.files[0]?.type == "image/jpg" ||
        e.target.files[0]?.type == "image/jpeg"
        // || e.target.files[0]?.type == "image/webp"
      ) {
        reader.addEventListener("load", () => {
          setImgData(reader.result)
        })
        reader.readAsDataURL(e.target.files[0])
        // uploading file
        data.append("", e.target.files[0])
        if (page == "auth-user") {
          setLoading(true)
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
        }
        if (page == "company") {
          setLoading(true)
          axios
            .post(`${API}/companies/${details?.id}/logo`, data, config)
            .then((res) => {
              setDetails({ ...details, logo: BACKEND + res.data?.path })
              dispatch({
                type: "ADD_LOGO",
                payload: {
                  id: details?.id,
                  data: res.data,
                },
              })
              alertDispatch({
                type: "ADD",
                payload: {
                  type: "success",
                  message: res.data.message,
                },
              })
              setLoading(false)
            })
            .catch((err) => {
              setLoading(false)
              if (err?.response) {
                alertDispatch({
                  type: "ADD",
                  payload: {
                    type: "danger",
                    message: err.response?.data?.message,
                  },
                })
              } else if (err?.message) {
                if (err?.code === "ECONNREFUSED") {
                  alertDispatch({
                    type: "ADD",
                    payload: {
                      type: "danger",
                      message: "Failed to connect, please try again",
                    },
                  })
                } else {
                  alertDispatch({
                    type: "ADD",
                    payload: {
                      type: "danger",
                      message: err?.message,
                    },
                  })
                }
              } else {
                alertDispatch({
                  type: "ADD",
                  payload: {
                    type: "danger",
                    message: "Internal server error, please try again",
                  },
                })
              }
            })
        }
      } else {
        alertDispatch({
          type: "ADD",
          payload: {
            type: "danger",
            message: "Only image files allowed!",
          },
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
            <span className={styles.icon__container}>
              <FaCamera className={styles.icon} />
            </span>
            {loading && (
              <span className={styles.spinner}>
                <Spinner />
              </span>
            )}
          </div>
        </label>
      </form>
    </div>
  )
}

export default Upload
