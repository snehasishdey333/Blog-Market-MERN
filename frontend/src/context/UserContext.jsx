import { createContext,useEffect,useState } from "react";
import axios from 'axios'

export const UserContext=createContext({})

export function UserContextProvider({children}){

    const [user,setUser]=useState(null)

    // useEffect(()=>{
    //     if(!user){
            
    //         axios.get('http://localhost:5000/api/auth/profile')
    //         .then(({data})=>{
    //             console.log(data)
    //             setUser(data)
    //         })
    //     }

    // },[])

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/auth/profile', {
    //     //   credentials: 'include',
    //     }).then(response => {
    //       response.json().then(userInfo => {
    //         setUser(userInfo);
    //       });
    //     });
    //   }, []);

    return (
        <UserContext.Provider value={{user,setUser}}>
         {children}
        </UserContext.Provider>
        
    )
}
