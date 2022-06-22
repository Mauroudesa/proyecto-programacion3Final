import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'; 

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            campos: "",
            error: null
        }
    }



    render() {
        const {signIn} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.Subcontainer}>
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
                 
                <TouchableOpacity style = {styles.button}onPress={() => signIn(this.state.email, this.state.password)}>
                    <Text style = {styles.sign}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Register') }>
                        <Text>No tengo cuenta</Text>
                 </TouchableOpacity>
                 <Text style = {styles.textoDeError}> {this.props.errorMessage} </Text>
                 </View>
            </View>
        )
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
        alignItems: 'center',
        
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