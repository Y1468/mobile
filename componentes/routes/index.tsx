import React,{useContext} from "react";
import { View,ActivityIndicator} from "react-native";
import AppRoutes from'./app.routes';
import Authuser from './auth.routes';
import { AltContext } from "../contexts/AuthContext";



export default function Routes(){

    //Passando contexto
    const {isAuthenticated,load}=useContext(AltContext)

    if (load) {
       return(
         <View style={{
            flex:1,
            backgroundColor:'#F5f7fb',
            justifyContent:'center',
            alignItems:'center'
         }}>
           <ActivityIndicator size={60} color='#1D1D2E'/>
         </View>
       ) 
    }
    return(
     isAuthenticated ?  <AppRoutes/> : <Authuser/>
    )
}