import React from "react";
import { View,StyleSheet,Text, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import { useNavigation,useRoute,RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../routes/app.routes";
import { api } from "../services/api";

type RouteDatailParams={

  FinishOrder:{
    number:number|string
    order_id:string
  }
}

type FinishOrderProp=RouteProp<RouteDatailParams,"FinishOrder">


export default function Finalizar(){

 const route=useRoute<FinishOrderProp>()
 const navigation=useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function handleFinish() {
    //Tirando pedidos de rascunho
     try{
       await api.put("/orde/send",{
        order_id:route.params?.order_id
       })

       navigation.popToTop();

     }catch(err){
        console.log("Erro ao finalizar")
     }
  }

    return(
      <View style={styles.container}>
         <Text style={styles.alert}> Deseja finalizar o pedido?</Text>
         <Text style={styles.title}>
          Mesa {route.params?.number}
         </Text>

         <TouchableOpacity style={styles.buton} onPress={handleFinish}>
           <Text style={styles.txtButon}>
            Finalizar pedido
            </Text>
           <Feather name="shopping-cart" size={20} color="#1d1d2e"/>
         </TouchableOpacity>
      </View>
    )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1d1d2e",
    paddingVertical:"5%",
    paddingHorizontal:"4%",
    alignItems:"center",
    justifyContent:"center"
  },
  alert:{
    fontSize:18,
    fontWeight:"bold",
    color:"#FFF",
    marginBottom:12
  },
   title:{
    fontSize:30,
    fontWeight:"bold",
    color:"#FFF",
    marginBottom:12
   },
   buton:{
     backgroundColor:"#3fffa3",
     flexDirection:"row",
     width:"65%",
     height:40,
     alignItems:"center",
     justifyContent:"center",
     borderRadius:4
   },
   txtButon:{
     fontSize:18,
     marginRight:8,
     fontWeight:"bold",
     color:"#1d1d2e"
   }
})