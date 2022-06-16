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
       campos: ""
     }
  }
  
registroNuevo(){
  if (this.state.email !== "" && this.state.password !== "" && this.state.username != "") {
    this.props.signUp(this.state.email, this.state.password, this.state.username)
  }
  else (this.setState({campos: "Falta rellenar algun campo"})); console.log(this.props);
}

  render(){  
  return (
    <View style = {styles.container}>
        <Text style={styles.text}> Registrooo </Text>
        <TextInput
          style={styles.field}
          placeholder="user"
          keyboardType="default"
          onChangeText={text => this.setState({username: text})}
          />
        
        <TextInput
          style={styles.field}
          placeholder="mail pa"
          keyboardType="email-address"
          onChangeText={text => this.setState({email: text})}
          />
          <TextInput
          style={styles.field}
          placeholder="clave"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
          /> 
            <Text style = {styles.textoDeError}> {this.state.campos} </Text> 
             <Text style = {styles.textoDeError}> {this.props.error} </Text>
          <TouchableOpacity style = {styles.button} onPress={() => this.registroNuevo()}>
            <Text style={styles.sign}> Registrate pa  </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Login') }>
                        <Text>Ya tengo cuenta</Text>
                 </TouchableOpacity>
    </View>
  );
   }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b8cde',
        paddingHorizontal:10,
        paddingTop: 80,
        marginLeft: 80,
        marginRight: 80,
        alignItems: 'center',
      
        
    },
    field: {
        width: '70%',
        backgroundColor: "#07396b",
        color: 'white',
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