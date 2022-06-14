import React, { Component } from "react";
import  { Text, View, StyleSheet,  FlatList, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config"; 

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  } 

  componentDidMount(){
    db.collection('Posteo')
    .where("owner", "==", auth.currentUser.displayName).orderBy("createdAt", "desc").onSnapshot(
      docs => {
          let postsAux = [] 
          docs.forEach( doc => {
              postsAux.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
        this.setState({
          info: postsAux,
  })
      })}


 

  render() {
    console.log(this.state.info);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
        <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
        <Text style={styles.text}>
          Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
        </Text>
    
        <TouchableOpacity  style={styles.button}  onPress={() => this.props.route.params.logout()} >
        <Text style={styles.sign}> Cerrar sesión </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.info}
          keyExtractor={(info) => info.id.toString()}
          renderItem = { ({item}) => <View style={styles.container}>
            <Image source= {item.data.photo} style= {styles.imagen}/>
            <Text style={styles.text}> Descripcion: {item.data.description} </Text>
          
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
