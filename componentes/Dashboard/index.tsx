import React,{useState,useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import {StackParamsList} from "../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
     View,
     Text,
     Button,
     SafeAreaView,
     TouchableOpacity,
     StyleSheet,
     TextInput
    } from "react-native";
import { AltContext } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Deshboard(){

    const navigation=useNavigation<NativeStackNavigationProp<StackParamsList>>()
    const [number,setNumber]=useState("")
    //const {signOut}=useContext(AltContext)
    
    async function openOrder() {
      
      if (number==="") {
           return
      }

      const response=await api.post("/order",{
         table:Number(number)
      })

      console.log(response.data);

      //fazer requisição e navegar pra proxima tela
      
      navigation.navigate("Order",{
         number:number,
         order_id:response.data.id
      })
       setNumber("")
    }

    return(
        <SafeAreaView style={styles.container}>
           <Text style={styles.txt}>Novo pedido</Text>

           <TextInput
            placeholder="Numero da mesa"
            placeholderTextColor="#F0F0F0"
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
            style={styles.input}
           />

           <TouchableOpacity style={styles.btn} onPress={openOrder}>
              <Text style={styles.btntxt}>Abrir mesa</Text>
           </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

   container:{
     flex:1,
     justifyContent:"center",
     alignItems:"center",
     paddingVertical:15,
     backgroundColor:"#1d1d2e"
   },

   txt:{
    fontSize:20,
    fontWeight:"bold",
    color:"#FFF",
    marginBottom:24
   },

   btn:{
    width:"90%",
    height:40,
    backgroundColor:"green",
    borderRadius:4,
    marginVertical:12,
    justifyContent:"center",
    alignItems:"center"
   },

   btntxt:{
    fontSize:18,
    color:"#101026",
    fontWeight:"bold"
   },

   input:{
    width:"90%",
    height:60,
    backgroundColor:"#101026",
    borderRadius:10,
    paddingHorizontal:8,
    textAlign:"center",
    fontSize:22,
    color:"#FFF"
   }
})