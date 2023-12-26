import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Deshboard from'../Dashboard/index';
import Order from '../Order/index';
import Finishorder from '../finishorder/index'

export type StackParamsList={
  Dashboard:undefined
  Order:{
    number:number|string
    order_id:string
  }
  Finishorder:{
    number:number|string
    order_id:string
  }

}

const Stack = createNativeStackNavigator<StackParamsList>();

export default function AppRoute(){
    return(  
        <Stack.Navigator>
          <Stack.Screen 
           name="Dashboard" 
           component={Deshboard}
           options={{headerShown:false}}
           />
        
        <Stack.Screen
          name="Order"
          component={Order}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Finishorder"
          component={Finishorder}
          options={{
            title:"Finalizando",
            headerStyle:{
              backgroundColor:"#1d1d2e"
            },
            headerTintColor:"#FFF"
          }}
        />
        </Stack.Navigator>
    )
}