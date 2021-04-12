import axios from "axios"
import { LOGIN } from "../types"

export const login = () => (dispatch) => {
  dispatch({ type: LOGIN })
}
