
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './componentes/routes';
import {AuthProvaider} from './componentes/contexts/AuthContext'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvaider>
       <StatusBar backgroundColor='#1d1d2e' barStyle='light-content' translucent={false}/>
       <Routes/>
      </AuthProvaider>
    </NavigationContainer>
      
       
    
  );
}

const styles = StyleSheet.create({
  
});
