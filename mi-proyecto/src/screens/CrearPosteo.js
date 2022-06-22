import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import MiCamara from '../components/MiCamera'
import { db, auth } from '../firebase/config';

class CrearPosteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:'',
            messageState: false,
            mostrarComponenteCamara: true,
            urlFoto:''
        }
    }

    

    CrearPosteo(message){
        db.collection('Posteo').add({
            createdAt: Date.now(),
            message:message,
            owner:auth.currentUser.email,
            likes:[],
            subMessages:[],
            foto:this.state.urlFoto
        })
        .then((response) => {
            this.setState({
                messageState: true,
                mostrarComponenteCamara: true
            })
            
        })

        
        .catch(error => console.log(error.message))
    }
    cuandoSubaLaImagen(url){
        console.log(url)
        this.setState({
            mostrarComponenteCamara:false,
            urlFoto: url
        })
    }
    render(){

        return (
            <>
            {
                this.state.mostrarComponenteCamara ?
                <MiCamara cuandoSubaLaImagen={(url)=> this.cuandoSubaLaImagen(url)}/>
                :

                <View style={styles.container}>
                    <Text>Comentame tu foto</Text>
                    <TextInput 
                    style={styles.textarea}
                    onChangeText= {(text)=> this.setState({
                        message: text
                    })}
                    value={this.state.message}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.CrearPosteo(this.state.message)
                            this.setState({ message:'',})
                            this.props.navigation.navigate('Home')
                        }}
                    >
                        <Text>Enviar mensaje</Text>
                    </TouchableOpacity>
                </View>
            }
            </>

        )
    }
}

const styles = StyleSheet.create({
    textarea:{
        borderWidth:1,
        borderColor:'#c3c3c3',
        height:'auto',
        minHeight:60,
        marginTop:10
    },
    btn:{
        marginTop:16,
        borderColor:'red',
        borderWidth:1
    }
})

export default CrearPosteo