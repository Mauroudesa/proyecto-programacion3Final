import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {Component} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import firebase from 'firebase'
import {auth, db} from '../firebase/config'

class Posteo extends Component {
    
    constructor(props){
        super(props)
        this.state={
            cantLikes:0,
            miLike:false,
            arrLikes:[],
            arrSubMessages:[]
        }
    }
    componentDidMount(){
        const documento = this.props.info.data
        const estaMiLike = documento.likes.includes(auth.currentUser.email)
        
        if(documento.likes){
            this.setState({
                cantLikes: documento.likes.length
            })
        }
        if(estaMiLike){
            this.setState({
                miLike:true
            })
        }
    }
    like(){
        const documento = this.props.info
        db.collection('Posteo').doc(documento.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(response => {
            this.setState({
                miLike:true,
                cantLikes: this.state.cantLikes + 1
            })
        })
        .catch(error=> console.log(error))
    }
    unlike(){
        const documento = this.props.info
        db.collection('Posteo').doc(documento.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(
            this.setState({
                miLike:false,
                cantLikes: this.state.cantLikes - 1
            })
        )
        .catch(error=> console.log(error))
    }
    
    render(){
        const documento = this.props.info.data
        return (
            <>
                <View style={styles.container}>
                    
                    <View style={styles.subcontainer}>
                        <Image style = {styles.img} source={ {
                            uri: documento.foto
                        }
                        
                        }></Image>
                        <Text style={styles.messageOwner}>{documento.owner}</Text>
                        <Text style={styles.messageText}>{documento.message}</Text>
                    </View>
                    <View style={styles.containerLike}>
                        <Text style={styles.likesCounter}>{this.state.cantLikes}</Text>
                        {
                            this.state.miLike
                            ?
                            
                            <TouchableOpacity onPress={()=> this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red'/> 
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=> this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' /> 
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} 
                onPress={() => this.props.navigation.navigate('Comments', {id: this.props.info.id})}>
                    <Text>Comentar el post</Text>
                </TouchableOpacity>
                
            </>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex: 1,
           alignItems: 'center',
           backgroundColor: '#40CFFF',
           width: "50%",
           alignContent: "center",
           marginLeft: "25%"
    },
    subcontainer:{
        
    },
    messageOwner:{
        fontWeight:600,
        
    },
    messageText:{
        paddingLeft:8,
        paddingVertical:8,
        padding: "5px",
        color: "white",
   
    },
    containerLike:{
        flexDirection:'row',
        
    },
    likesCounter:{
        marginRight:8,
    },
    btn:{
        backgroundColor: "orange",
        color: "black",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
        marginLeft:"25%",
        marginRight:"25%"
      },
      img:{
        height: 300,
        width: '100%' 
      }
})
export default Posteo




















