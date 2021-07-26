import { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { FaCamera } from "react-icons/fa"
import { API } from "../../api"
import { useAuthDispatch } from "../../../context/auth"
import { useAlertsDispatch } from "../../../context/alerts"
import styles from "./upload.module.sass"

const Upload = ({ dp, name }) => {
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
      let token = Cookies.get("token")
      let config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }

      data.append("", e.target.files[0])
      axios
        .post(`${API}/users/dp`, data, config)
        .then((res) => {
          console.log(res.data)
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
          // setLoading(false)
        })
        .catch((err) => {
          // setLoading(false)
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
