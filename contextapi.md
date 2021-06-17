# A markdown to explain how context api works along with useReducer hook

Contextapi uses two main hooks (createContext and useContext), along with one hook to set and update state{this hook isn't must but it is important}.

Lets use both useState hook and useReducer hook just to get general idea even though in the app useReducer is used.

## 1. contextapi with useState

create a file say `auth.js` and start editing

First import react and them hooks
```JS
import React, { createContext, useContext, useState } from "react"
```

Second create the context lets call it userContext
```JS
const UserContext = createContext()
```

Third create a state provider passing children as props (children can be anything you pass, and in our case it is the whole app, this also means this is a react component and we gonna wrap it on our application
```JS
export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
       isAuthenticated: false,
       user: null
    })
    // the value passed in here will be accessible anywhere in our application 
    // you can pass any value, in our case we pass user state and it update method 
    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
}
```

Lastly lets declare a method to use oue context
```JS
// we can access to user and setUser using this method 
// anywhere in any component that's inside UserProvider
export const useAuthContext = useContext(UserContext)
```

Combining these things together we have

`auth.js`
```JS
import React, { createContext, useContext, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
       isAuthenticated: false,
       user: null
    })
    // the value passed in here will be accessible anywhere in our application 
    // you can pass any value, in our case we pass user state and it update method 
    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
}

// we can access to user and setUser using this method 
// anywhere in any component that's inside UserProvider
export const useAuthContext = useContext(UserContext)

```

Lets go and use it now

In our `_app.js` lets import UserProvider and wrap our app in it
If it was create react app boilder pltae you could use Provider inside `index.js`

`_app.js`
```JS
...

// import provider from auth js
import { UserProvider } from "../context/auth"

function MyApp({ Component, pageProps }) {
    // Wrap the Component inside provider
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    )
}

export default MyApp
```

Now our state is global, lets go and use/change it

Create a any file lets say `index.js` in the pages

In this file import useAuthContext from `auth.js`, lets see it in action

`index.js`
```JS
...
import { useAuthContext } from "../../context/auth.js"

const Home = () => {
    // declare state just like you did in auth js
    // But instead of useState, use useAuthContext
    const [user, setUser] = useAuthContext()
    
    update state using setUser say
    useEffect(() => {
        setUser({
            ...,
            isAuthenticated: true,
            user: {
                name: "John",
                email: "john@email.com"
            },
        })
    },[])

    // state is set and we can now use user

    return (
        <div>
            {user.name && user.name}<br/>
            {user.email && user.email}
        </div>
    )
}

export default Home
```

Now we have our state. You can use this state in any component but you must import [user, setUser] even when you don't need to use user.

## 2. contextapi with useReducer

useReducer is one of the hook that helps in managing states
You can use this hook as a replacement for useState, doesn't necessarily require contextapi, its a standalone hook

How it works?
First import useReducer from react 

```JS
import React, { useReducer } from "react"
```

Second declare a state ie 

```JS
// state state and display are the only thing passed here and 
// state means state while dispatch is any action that changes the state kinda like setstate
// reducerFn is any function which returns something, this plus dispatch are what changes the state
const [state, dispatch] = useReducer(reducerFn, initialState)
```

Now that we have seen how we can declare a state, lets take a look on reducerFn, this is any function and whatever name you give it.

It takes in state which is the initial State you declared and action

action is an object that comprises type and payload so while dispatching you pass in type and payload, 
we usually use switch statement which checks for which type is selected and return something as you've declared

these will make sense in a second, lets get into it

```JS
// reducer function
const reducer = ( state, action ) => {
    const {type, payload}
    switch (type) {
        // Login user
        case "LOGIN":
            // whatever logic like adding token to cookie/localstorage
            // the return statement will update the initial state
            return {
                ...state, // its always safe to do this
                user: payload // this is what passed as a payload when a dispatching a certain action of type login
            } // whatever you wanna return to update state
 
        case "LOGOUT":
             // whatever logic like removing token
             return {
                 ...state,
                 user: null
             }

        default:
            return state
    }
}
```

Now that we have our reducer function, lets clearly set our state
```JS
const [state, dispatch] = useReducer(reducer, {
  user: null
})
```

Now that we have our state, lets put them all in a component to see them in action

