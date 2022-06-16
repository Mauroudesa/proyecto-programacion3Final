import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import CrearPosteo from './CrearPosteo'
import Home from './home'
import Profile from './miperfil'
import Search from './search';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function TabNavigation(props) {
  const{logout} = props.route.params
  
    return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}
        options={ 
          { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
         } 
        />
        <Tab.Screen name='CrearPosteo' component={CrearPosteo} 
        options={ 
          { tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" /> }
         } />
        <Tab.Screen name='Search' component={Search}
         options={ 
          { tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }
         } />
        
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        
        initialParams={{
            logout: () => logout()
        }}
        options={ 
          { tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="black" /> }
        }
        
        />
    </Tab.Navigator>
  )
}