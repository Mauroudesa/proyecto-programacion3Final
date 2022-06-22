import React, { Component } from 'react';
import  {  Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'; 
import {auth} from '../firebase/config';

export default class Registro extends Component {
  constructor(props){
     super(props);
     this.state = {
       email: "",
       password: "",
       username: "",
       campos: "",
       message:''
     }
  }
  
  componentDidMount(){
    // console.log(this.props.route.params.errorMessage)
    auth.onAuthStateChanged((user)=>{
      // console.log(user)
    })
  }

  render(){  
    const {signUp} = this.props
  return (
    
    <View style = {styles.container}>
      <View style = {styles.Subcontainer}>
        <Text style={styles.text}> Registro </Text>
        <TextInput
          style={styles.field}
          placeholder="user"
          keyboardType="default"
          onChangeText={text => this.setState({username: text})}
          />
        
        <TextInput
          style={styles.field}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => this.setState({email: text})}
          />
          <TextInput
          style={styles.field}
          placeholder="contraseña"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
          /> 

             <Text style = {styles.textoDeError}> {this.props.error} </Text>

          <TouchableOpacity style = {styles.button} onPress={
          () => {
            signUp(this.state.email, this.state.password)
          }}>
            <Text style={styles.sign}> Registrarse </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Login') }>
                        <Text>Ya tengo cuenta</Text>
                 </TouchableOpacity>
    
                 </View>
    </View>
  );
   }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b8cde',
        alignItems: 'center',
      
        
    },
    field: {
        width: '70%',
        backgroundColor: "#07396b",
        color: 'white',
    },
    Subcontainer: {
      marginTop: 60,
      width: '100%',
      alignItems: 'center'
  },
    button: {
        width: '30%',
        backgroundColor: "#07396b",
    },
   
    textoDeError: {
        fontWeight: 'bold',
        color: 'white'
    }, 
    sign: {
      color: 'white',
      fontWeight: 'bold',
      textAlign:'center',
      fontSize: 20,
  }
  })