import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const server = "https://nodejs-todoapp-nue0.onrender.com/api/v1";

export const Context = createContext({ isAuth: false });

const AppWrapper = () => {
  const [isAuth , setisAuth ] = useState(false);
  const [loader , setLoader ] = useState(false);
  const [user , setUser ] = useState({});
  return (
    <Context.Provider value={{isAuth , setisAuth , loader , setLoader ,user , setUser }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
