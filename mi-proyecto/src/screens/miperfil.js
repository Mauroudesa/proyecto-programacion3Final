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
    .where("owner", "==", auth.currentUser.email).orderBy("createdAt", "desc").onSnapshot(
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
        <Text> Hola {auth.currentUser.displayName} Tenes {this.state.info.length} posteos en tu perfil:</Text>

    
        <TouchableOpacity  style={styles.button}  onPress={() => this.props.route.params.logout()} >
        <Text style={styles.sign}> Cerrar sesión </Text>
        </TouchableOpacity>
        <FlatList style={styles.containerPosteos}
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
    flex:1,
    paddingTop:16,
    paddingBottom:32,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: '#3b8cde',
},
field: {
    width: '30%',
    backgroundColor: "black",
    color: '#ffffff',
},
button: {
    width: '30%',
    backgroundColor: "#07396b",
    left: '70%',
    textAlign: 'center'
},

textoDeError: {
    fontWeight: 'bold',
    color: '#ffffff'
}, 
sign: {
  color: 'white',
  fontWeight: 'bold',
  textAlign:'center',
  fontSize: 20,
},
text:{

    color:'white'
  
},
containerPosteos:{
  backgroundColor: '#195da2',

}

})
