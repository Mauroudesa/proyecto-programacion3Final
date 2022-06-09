//Estructura base de un componente con estado
import React, { Component } from 'react';

//1 Componentes de navegación
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import de íconos
import { Entypo, Foundation, AntDesign } from '@expo/vector-icons'


//Importar las pantallas
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

// Guardar la ejecución de createBottomTabNavigator
const Tab = createBottomTabNavigator();

// Armar el compoente con el render del menú

class Menu extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
        //Armar el menú
           <NavigationContainer>
               <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>

                    <Tab.Screen 
                        name='Login' 
                        component={ Login }
                        options={
                            { tabBarIcon: () => <Entypo name="login" size={24} color="black" /> }
                        }/>

                    <Tab.Screen 
                        name='Register' 
                        component={ Register }
                        options={
                            { tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }
                        }/>

            

               </Tab.Navigator>
           </NavigationContainer> 

        )
    }
}

export default Menu;