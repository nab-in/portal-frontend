import React, { createContext, useReducer, useContext } from "react"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: payload?.verified,
        user: payload,
      }
    case "REGISTER":
      return {
        ...state,
        user: payload,
      }

    // Logout
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    // Get user data
    case "AUTH":
      return {
        ...state,
        user: payload,
        isAuthenticated: payload?.verified,
      }
    default:
      return {
        state,
      }
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: {
      id: 1,
      firstname: "Admin",
      lastname: "Portal",
      username: "admin",
      role: "admin",
      dp: null,
      verified: true,
      title: "Software Developer",
      bio: "I create best softwares",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet imperdiet nunc vitae eu neque. Lobortis aliquet cursus sem accumsan. Sit pulvinar eget leo sagittis. Euismod nulla in tellus adipiscing.",
      website: "http://mywebsite.com",
      location: "Kilimanjaro Tanzania",
      cv: null,
    },
    isAuthenticated: true,
  })
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)
