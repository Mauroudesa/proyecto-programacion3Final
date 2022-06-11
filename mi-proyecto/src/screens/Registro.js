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
    this.props.registroNuevo(this.state.email, this.state.password, this.state.username)
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
    </View>
  );
   }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
  },
  field: {
      width: '30%',
      backgroundColor: "black",
      color: '#ffffff',
  },
  button: {
      width: '30%',
      backgroundColor: "black",
  },
 
  textoDeError: {
      fontWeight: 'bold',
      color: '#ffffff'
  }, 
  sign: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: 20,
}
  })