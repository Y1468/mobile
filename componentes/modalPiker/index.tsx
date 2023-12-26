import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,ScrollView} from "react-native";
import {categoryProps} from "../Order/index"

interface ModalPikerProps{

  options:categoryProps[];
  handleCloseModal:()=>void;
  selectedItem:(item:categoryProps)=>void;
}
//Selecionando item
const {width:WIDTH,height:HEIGHT}=Dimensions.get("window")

export default function Modal({options,handleCloseModal,selectedItem}:ModalPikerProps){

    function onPresItem(item:categoryProps){

      selectedItem(item)
      handleCloseModal()
    }

    const option=options.map((item,index)=>(

       <TouchableOpacity key={index} style={styles.option} onPress={()=>onPresItem(item)}>
           <Text style={styles.item}>{item?.name}</Text>
       </TouchableOpacity>
    ))
    return(
       <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
          <View style={styles.content}>
             <ScrollView showsVerticalScrollIndicator={false}>
               {option}
             </ScrollView>
          </View>
       </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  content:{
    width:WIDTH-20,
    height:HEIGHT/2,
    backgroundColor:"#FFF",
    borderWidth:1,
    borderColor:"#8a8a8a",
    borderRadius:4
  },
  option:{
    alignItems:"flex-start",
    borderTopWidth:0.8,
    borderTopColor:"#8a8a8a"
  },
  item:{
    margin:18,
    fontSize:14,
    fontWeight:"bold",
    color:"#101026"
  }

})