import axios from 'axios';
import React, { useState, useContext, useEffect, useCallback} from 'react'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const [session, setSession] = useState(false)

  console.log(children)
  const Validation = useCallback( async()=>{
    const token = await axios.get("http://localhost:4000/validateJWT", {withCredentials: true})
    console.log(token);
  if(token.data.decodedToken){
    return setSession(true)   
  }
},[])

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