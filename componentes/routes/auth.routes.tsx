import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from'../signin/index';

const Stack = createNativeStackNavigator();

export default function Auth(){
    return( 
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}