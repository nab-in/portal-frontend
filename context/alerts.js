import React, { createContext, useReducer, useContext } from "react"

const AlertsStateContext = createContext()
const AlertsDispatchContext = createContext()

const alertsReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    default:
      return {
        state,
      }
  }
}

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertsReducer, {
    message: {},
  })
  return (
    <AlertsDispatchContext.Provider value={dispatch}>
      <AlertsStateContext.Provider value={state}>
        {children}
      </AlertsStateContext.Provider>
    </AlertsDispatchContext.Provider>
  )
}

export const useAlertsState = () => useContext(AlertsStateContext)
export const useAlertsDispatch = () => useContext(AlertsDispatchContext)
