import axios from 'axios';
import React, { useState, useContext, useEffect, useCallback} from 'react'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const [session, setSession] = useState(false)

  console.log(children)
  const Validation = useCallback( async()=>{
    const token = await axios.get("https://popawebapi.vercel.app/validateJWT", {withCredentials: true})
    console.log(token);
    console.log(session)
  if(token.data.decodedToken){
    console.log(session)
    return setSession(true)   
  }
},[session])

useEffect(()=>{
  Validation()
},[Validation, session])

return(
  <AppContext.Provider
  value={{ session, setSession }}>
    {children}
  </AppContext.Provider>
)
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider}