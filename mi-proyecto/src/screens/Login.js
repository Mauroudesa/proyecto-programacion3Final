import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'; 

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            campos: ""
        }
    }

   logueoNuevo(){
        if (this.state.email !== "" && this.state.password !== "") {
          this.props.logueoNuevo(this.state.email, this.state.password)
        }
        else (this.setState({campos: "Falta completar algun campo"})); 
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Login</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                 <Text style = {styles.textoDeError}> {this.state.campos} </Text>
                 <Text style = {styles.textoDeError}> {this.props.falla} </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.logueoNuevo()}>
                    <Text style = {styles.sign}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Register') }>
                        <Text>No tengo cuenta</Text>
                 </TouchableOpacity>
            </View>
        )
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