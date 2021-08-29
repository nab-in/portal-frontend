import React, { createContext, useReducer, useContext } from "react"
import Cookies from "js-cookie"
import { BACKEND } from "../components/api"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

let token = Cookies.get("token")
if (token === "") Cookies.set("token", "")

const authReducer = (state, action) => {
  let { type, payload } = action
  let userCopy
  switch (type) {
    case "LOGIN":
      Cookies.set("token", payload.token)
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      }
    case "REGISTER":
      return {
        ...state,
        user: payload,
      }

    // Logout
    case "LOGOUT":
      Cookies.set("token", "")
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    case "COMPANIES":
      return {
        ...state,
        companies: payload,
      }

    case "ADD_COMPANY":
      let companiesCopy = [...state.companies, payload]
      return {
        ...state,
        companies: companiesCopy,
      }

    case "USERROLES":
      return {
        ...state,
        roles: payload,
      }

    case "CATEGORIES":
      let data
      let finalData
      let filter = []
      data = payload
      data.forEach((el) => {
        if (el.children) filter = filter.concat(el.children)
      })
      filter.forEach((el) => {
        data = data.filter((o) => o.id != el.id)
      })
      finalData = [
        {
          id: 12,
          name: "Job Type",
          children: [
            {
              id: 14,
              name: "Freelance",
            },
            {
              id: 15,
              name: "Full Time",
            },
          ],
        },
        ...data,
      ]
      return {
        ...state,
        categories: finalData,
      }

    case "CATEGORIES_FAIL":
      return {
        ...state,
        categories: [
          {
            id: 12,
            name: "Job Type",
            sub_categories: [
              {
                id: 14,
                name: "Freelance",
              },
              {
                id: 15,
                name: "Full Time",
              },
            ],
          },
        ],
      }

    case "ADD_DP":
      userCopy = {
        ...state.user,
        dp: BACKEND + payload.path,
      }
      return {
        ...state,
        user: userCopy,
      }
    case "ADD_CV":
      userCopy = {
        ...state.user,
        cv: BACKEND + payload.path,
      }
      return {
        ...state,
        user: userCopy,
      }

    case "ADD_PROFILE":
      let id = Cookies.get("identity")
      if (id) id = JSON.parse(id)
      userCopy = { ...payload, identity: id }
      return {
        ...state,
        user: userCopy,
      }

    // Get user data
    case "AUTH":
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      }
    case "FAILED":
      return {
        ...state,
        loading: false,
      }
    default:
      return {
        state,
      }
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    isAuthenticated: false,
    companies: [],
    roles: [],
    categories: [],
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
