import React, { Component } from "react";
import  { Text, View, StyleSheet,  FlatList, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config"; 

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  } 

 

  render() {
    console.log(this.state.posts);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
        <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
        <Text style={styles.text}>
          Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
        </Text>
        <Text  style={styles.text}>Publicaciones: {this.state.posts.length}</Text> 
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.deslogueo()}
        >
          <Text style={styles.sign}> Cerrar sesión </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.posts}
          keyExtractor={(posts) => posts.id.toString()}
          renderItem = { ({item}) => <View style={styles.container}>
            <Image source= {item.data.photo} style= {styles.imagen}/>
            <Text style={styles.text}> Descripcion: {item.data.description} </Text>
            <Text  style={styles.text}> Likes: {item.data.likes.length} </Text> 
            <TouchableOpacity
          style={styles.button}
          onPress={() => this.borrarPosteo(item)} >
          <Text style= {styles.sign}> Borrar Posteo </Text>
        </TouchableOpacity>
        </View>
              }
        />
      
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
