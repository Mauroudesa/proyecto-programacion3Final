import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, {Component} from 'react'
import CrearPosteo from './CrearPosteo'
import Home from './home'
import Profile from './miperfil'
import Search from './search';

const Tab = createBottomTabNavigator()

export default function TabNavigation(props) {
  const{logout} = props.route.params
  
    return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='CrearPosteo' component={CrearPosteo} />
        <Tab.Screen name='Search' component={Search} />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        initialParams={{
            logout: () => logout()
        }}
        />
    </Tab.Navigator>
  )
}