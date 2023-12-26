import React,{useState,useEffect} from "react"
import {View,Text,StyleSheet, TouchableOpacity,TextInput,Modal,FlatList} from "react-native"
import { useRoute,RouteProp,useNavigation} from "@react-navigation/native"
import {Feather} from "@expo/vector-icons"
import Modalpiker from "../modalPiker/index"
import Listitem from "../listitem"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamsList } from "../routes/app.routes"
import { api } from "../services/api"

type RouteDatailParams={
   Order:{
     number:string|number
     order_id:string
   }
}

//Tipagem
export type categoryProps={
    id:string
    name:string

}

type pruductProps={
   id:string
   name:string
}

type itemProps={
  id:string
  product_id:string
  name:string
  amount:string
}

type ordeRouteProp=RouteProp<RouteDatailParams,"Order">;

export default function Order(){
  
    const route=useRoute<ordeRouteProp>()
    const navigation=useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [category,setCategory]=useState<categoryProps[]|[]>([])
    const [categorySelected,setCategorySelected]=useState<categoryProps | undefined>()
    const [modalCategoryVisible,setModalCategoryVisible]=useState(false)

    const [product,setProduct]=useState<pruductProps[]|[]>([])
    const [productSelected,setProductSelected]=useState<pruductProps | undefined>()
    const [modalProductVisible,setModalProductVisible]=useState(false)

    const [amount,setAmount]=useState("1")
    const [items,setItems]=useState<itemProps[]>([])

    //Listando categoria
    useEffect(()=>{
          async function loadInfo(){

            const response=await api.get("/list")
            setCategory(response.data)
            setCategorySelected(response.data[0])
          }

          loadInfo()
    },[])

    //Busca produltos
     useEffect(()=>{

         async function loadProducts() {
           const response=await api.get("/categori/produte",{
              params:{
                category_id:categorySelected?.id
              }
           })
            setProduct(response.data)
            setProductSelected(response.data[0])
         } 
         loadProducts() 

    },[categorySelected])
    
    async function handleCloseOrder() {
       try{
         //Deletando ordem
         await api.delete("/deletaorde",{
          params:{
            order_id:route.params?.order_id
          }
         })

         navigation.goBack();

       }catch(err){
          console.log(err)
       }
    }
     function handleShangeCategory(item:categoryProps){
        setCategorySelected(item)
     }

     function handleShangeProduct(item:pruductProps){
        setProductSelected(item)
     }
     async function handleAdd(){
        //Adcionando items
        const response=await api.post("/additem",{
            order_id:route.params?.order_id,
            product_id:productSelected?.id,
            amount: Number(amount)
        })

        let data={
          id:response.data.id,
          product_id:productSelected?.id as string,
          name:productSelected?.name as string,
          amount:amount
        }

        setItems(oldArray=>[...oldArray,data])
     }
      async function handleDeletItem(item_id:string) {
        //Deletando items
        await api.delete("/delitem",{
          params:{
            item_id:item_id
          }
        })
        //Removendo da tela
        let removeItem=items.filter(item=>{
          return(item.id !== item_id)
        }) 
        setItems(removeItem)
      }

      function handleFinishOrdem(){
        
        navigation.navigate("Finishorder",{
          number:route.params?.number,
          order_id:route.params?.order_id
        })
      }

    return(
       <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
             Mesa {route.params.number}
            </Text>
           {items.length===0 && (
             <TouchableOpacity onPress={handleCloseOrder}>
             <Feather name="trash-2" size={28} color="#FF3F4b"/>
           </TouchableOpacity>
           )}
          </View>

           {category.length!==0 &&(
              <TouchableOpacity style={styles.input} onPress={()=>setModalCategoryVisible(true)}>
              <Text style={{color:"#FFF"}}>{categorySelected?.name}</Text>
            </TouchableOpacity>
           )}

           {product.length!==0 && (
            <TouchableOpacity style={styles.input} onPress={()=>setModalProductVisible(true)}>
              <Text style={{color:"#FFF"}}>{productSelected?.name}</Text>
            </TouchableOpacity>
           )}

           <View style={styles.qtContainer}>
             <Text style={styles.qtdText}>Quantidade</Text>
             <TextInput
              placeholderTextColor="#F0F0F0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={[styles.input,{width:"55%",textAlign:"center",marginTop:15}]}
             />
           </View>

           <View style={styles.actions}>

             <TouchableOpacity style={styles.butonAdd} onPress={handleAdd}>
               <Text style={styles.butonText}>+</Text>
             </TouchableOpacity>

             <TouchableOpacity 
              style={[styles.buton,{opacity: items.length===0 ? 0.3 : 1 }]}
              disabled={items.length===0}
              onPress={handleFinishOrdem}
              >
               <Text style={styles.butonText}>Avançar</Text>
             </TouchableOpacity>
           </View>

           <FlatList
             showsVerticalScrollIndicator={false}
             style={{flex:1,marginTop:24}}
             data={items}
             keyExtractor={(item)=>item.id}
             renderItem={({item})=> <Listitem data={item} deletItem={handleDeletItem}/>}
           />

           <Modal
            transparent={true}
            visible={modalCategoryVisible}
            animationType="fade"
           >
             <Modalpiker
               handleCloseModal={()=>setModalCategoryVisible(false)}
               options={category}
               selectedItem={handleShangeCategory}  
             />
           </Modal>

           <Modal
            //Listando produlto
            transparent={true}
            visible={modalProductVisible}
            animationType="fade"
           >
            <Modalpiker
             handleCloseModal={()=>setModalProductVisible(false)}
             options={product}
             selectedItem={handleShangeProduct}

            />

           </Modal>

       </View>
    )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1d1d2e",
    paddingVertical:"5%",
    paddingEnd:"4%",
    paddingStart:"4%"
  },
   title:{
     fontSize:30,
     fontWeight:"bold",
     color:"#FFF",
     marginRight:14
   },
   header:{
     flexDirection:"row",
     marginBottom:12,
     alignItems:"center",
     marginTop:24
   },
   input:{
     backgroundColor:"#101026",
     borderRadius:4,
     width:"100%",
     height:40,
     marginBottom:12,
     justifyContent:"center",
     paddingHorizontal:8,
     color:"#FFF",
     fontSize:20
   },
   qtContainer:{
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"space-between"
   },
   qtdText:{
     fontSize:20,
     fontWeight:"bold",
     color:"#FFF",
   },
   actions:{
     flexDirection:"row",
     justifyContent:"space-between",
     width:"100%"
   },
   butonAdd:{
    width:"20%",
     backgroundColor:"#3fd1ff",
     borderRadius:4,
     height:40,
     justifyContent:"center",
     alignItems:"center"
   },
   butonText:{
     color:"#101026",
     fontSize:16,
     fontWeight:"bold"
   },
   buton:{
     backgroundColor:"#3fffa3",
     borderRadius:4,
     height:40,
     width:"75%",
     alignItems:"center",
     justifyContent:"center"
   }
})