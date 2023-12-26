import React,{useState,createContext,ReactNode,useEffect} from "react";
import {api}from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage";

//Contexto de autenticação

type AuthContextdata={
   user:userProps
   isAuthenticated:boolean
   signin:(credencials:signinProps)=>Promise<void>
   lodinAuth:boolean
   load:boolean
   signOut:()=>Promise<void>
}

type userProps={
    id:string
    name:string
    email:string
    token:string
}

type AuthProviderProps={
    children:ReactNode
}

type signinProps={
    email:string
    password:string
}
export const AltContext=createContext({} as AuthContextdata)

export function AuthProvaider({children}:AuthProviderProps){

    const [user,setUser]=useState<userProps>({
        id: "",
        name: "",
        email:"",
        token:""
    })

    const[lodinAuth,setLodinAuth]=useState(false)
    const [load,setLoad]=useState(true)
    const isAuthenticated=!!user.name

    //Permanecendo login
    useEffect(()=>{
        
        async function getUser() {

            const userInfo=await AsyncStorage.getItem("@sujeitopitsa")
            let hasUser:userProps=JSON.parse(userInfo || "{}")

        //Verificar se recebeu as informações do usuario
            if (Object.keys(hasUser).length>0) {
                api.defaults.headers.common["Authorization"]=`Bearer ${hasUser.token}`

                setUser({
                    id:hasUser.id,
                    name:hasUser.name,
                    email:hasUser.email,
                    token:hasUser.token
                })
            }

            setLoad(false)
        }


        getUser()
    },[])

    //Logando usuario
    async function signin({email,password}:signinProps) {
        setLodinAuth(true)

    try{

      const response=await api.post("/session",{
        email,
        password
      }) 

      const {id,name,token}=response.data

      const data={
        ...response.data
      }

      await AsyncStorage.setItem("@sujeitopitsa",JSON.stringify(data))

      //Passando token
      api.defaults.headers.common["Authorization"]=`Bearer ${token}`

      setUser({
        id,
        name,
        email,
        token
      })

    }catch(err){
      setLodinAuth(false)
    }
        
    }

    //Deslogando usuario:metodo signout
    async function signOut() {
        //Linpando async storage
        await AsyncStorage.clear()
          .then(()=>{
             setUser({
               id:"",
               name:"",
               email:"",
               token:""
             })
          })


    }

    return(
      <AltContext.Provider value={{
      user,
      isAuthenticated,
      signin,
      load,
      lodinAuth,
      signOut
      
      }}>
         {children}
      </AltContext.Provider>
    )
}

