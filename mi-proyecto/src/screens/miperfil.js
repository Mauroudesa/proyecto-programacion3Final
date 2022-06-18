import React, { Component } from "react";
import  {  View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, Image, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase/config"; 

import Posteo from "../components/message";

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: true,
      Posteos: [],
      error: 'Todavia no hiciste ningun posteo'
    }
  } 

  componentDidMount(){
    db.collection('Posteo').where("owner", "==", auth.currentUser.email).orderBy("createdAt", "desc").onSnapshot(
      docs => {
          let Posteo = [] 
          docs.forEach( doc => {
            Posteo.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
        this.setState({
          Posteo: Posteo,
          cargando: false
  })
      })}

 

  render() {
    console.log(auth.currentUser) 
    return (
      <View style={styles.container}>
        <View>
           <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
           <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
       </View>
       <View>
           <Text style={styles.text}>Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}</Text>
         

        <TouchableOpacity  style={styles.button}  onPress={() => this.props.route.params.logout()} >

           <Text style={styles.sign}> Cerrar sesión </Text>

         </TouchableOpacity>
        </View>
        <View>
                    {this.state.cargando ?
                            <ActivityIndicator size='small' color='blue' />
                            :
                            this.state.Posteo.length === 0 ?
                            <Text>{this.state.error}</Text>
                            :
                            <FlatList
                                numColumns={2}
                                horizontal={false}
                                data={this.state.Posteo}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <Posteo info={item} navigation = {this.props.navigation} />}
                            />
                        }
                    </View>
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
    
    backgroundColor: "black",
    color: '#ffffff',
},
button: {
   
    backgroundColor: "#07396b",
   
},

textoDeError: {
    fontWeight: 'bold',
    color: '#ffffff'
}, 
sign: {
  
},
text:{

    color:'white'
  
},
containerPosteos:{
  

}

})
