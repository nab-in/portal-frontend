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

2. contextapi with useReducer
