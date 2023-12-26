
import { useState,useContext} from 'react'
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableHighlight,
   Image,
   TouchableOpacity,
   ActivityIndicator
} from 'react-native'
import {AltContext} from '../contexts/AuthContext'

export default function Tela2(){

   const {signin,lodinAuth}=useContext(AltContext)
   const[email,setEmail]=useState('')
   const[password,setPassword]=useState('')

   async function Login(){
     if (email==='' || password==='') {
        return
     }
     await signin({email,password})
   }
    return(
       <View style={styles.container}>
          <Image 
           source={require('../../Image/logo.png')}
           style={styles.image}
          />

          <View>
             <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#F0F0F0'
              value={email}
              onChangeText={setEmail}
             />
             <TextInput
              style={styles.input}
              placeholder='Senha'
              placeholderTextColor='#F0F0F0'
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
             />
          </View>

          <View>
            <TouchableOpacity 
             style={styles.btn}
             onPress={Login}
             >
               {lodinAuth ?(
                  <ActivityIndicator size={25} color="#FFF"/>
               ):(
                <Text style={styles.txt}>Acessar</Text>
               )
              }
            </TouchableOpacity>
          </View>
       </View>
    )
}

const styles=StyleSheet.create({

   container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#1d1d2e'
   },
   input:{
      borderWidth:2,
      borderColor:'#FFF',
      padding:10,
      width:340,
      borderRadius:7,
      margin:15
   },
   btn:{
      backgroundColor:'blue',
      padding:15,
      width:340,
      borderRadius:7
   },

   txt:{
      color:'white',
      fontSize:15,
      fontWeight:'bold',
      textAlign:'center',
      justifyContent:'center'
   },
   image:{
      marginBottom:25,
   }
   

})
