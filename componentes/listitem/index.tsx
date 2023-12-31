import React from "react";
import { StyleSheet, View ,Text,TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons"

interface ItemProps{
    data:{
        id:string
        product_id:string
        name:string
        amount:string    
    }
    deletItem:(item_id:string)=>void
}
export default function Listitem({data,deletItem}:ItemProps){
    
    function handleDeletItem(){
        deletItem(data.id)
    }
    return(
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount}-{data.name}</Text>

           <TouchableOpacity onPress={handleDeletItem}>
              <Feather size={25} name="trash-2" color="#FF3F4b"/>
           </TouchableOpacity>
        </View>

    )
}

const styles=StyleSheet.create({
  container:{
     backgroundColor:"#101026",
     flex:1,
     alignItems:"center",
     justifyContent:"space-between",
     flexDirection:"row",
     marginBottom:12,
     paddingVertical:12,
     paddingHorizontal:12,
     borderRadius:4,
     borderWidth:0.3,
     borderColor:"#8a8a8a"
  },
  item:{
     color:"#FFF"
  }
})