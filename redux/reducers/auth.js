import { LOGIN } from "../types"

const initialState = {
  user: null,
  isAuthenticated: false,
}

const auth = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      }
    default:
      return state
  }
}

export default auth
