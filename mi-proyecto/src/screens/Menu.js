import React, {Component} from 'react'
import { auth, db } from '../firebase/config';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Home from "./home";
import Register from "./Registro";
import { StatusBar } from 'expo-status-bar';
import TabNavigation from './TabNavigation';
import CrearPosteo from './CrearPosteo'
import Search from './search';
import Comments from './Comments';

const Stack = createNativeStackNavigator()

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            errorMessage:''
        }
    }
    

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({loggedIn: true})
            }
        })
    }

    logout(){
        auth.signOut()
        .then(response => this.setState({loggedIn: false}))
        .catch(error => console.log(error))
    }

    //registro
    signUp(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => this.setState({logedIn: true}))
        .catch(error => this.setState({errorMessage:error.message}))
    }

//login
    signIn(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => { this.setState({loggedIn:true})})
        .catch(error =>this.setState({errorMessage: error.message}))
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        this.state.loggedIn ? // Es una manera de hacer un condicional con true o false
                        <Stack.Group>
                            <Stack.Screen 
                                name='TabNavigation' 
                                component={TabNavigation}
                                options={{headerShown:false}}
                                initialParams={{logout: () => this.logout(),errorMessage: this.message}}
                            />
                            <Stack.Screen
                                name='Comments'
                                component={Comments}
                            />               
                        </Stack.Group>
                        
                        :
                        
                        <Stack.Group>
                            <Stack.Screen 
                                name='Register' 
    
                                children={
                                    (props)=> <Register 
                                    signUp={(email, password)=> this.signUp(email, password)}
                                    errorMessage={this.state.errorMessage}
                                    {...props}
                                    />
                    
                                }
                                options={{
                                    headerShown:false
                                }}
                            />
                             <Stack.Screen 
                                name='Login' 
                                children={
                                    (props)=> <Login
                                    signIn={(email, password)=> this.signIn(email, password)}
                                    errorMessage={this.state.errorMessage}
                                    {...props}
                                    />
                    
                                }
                                options={{
                                    headerShown:false
                                }}
                            />
                        </Stack.Group>
                    }
                        
                </Stack.Navigator>
    </NavigationContainer>

        )
    }

}

export default StackNavigation