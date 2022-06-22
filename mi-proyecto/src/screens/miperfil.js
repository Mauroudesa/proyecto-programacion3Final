import React, { Component } from "react";
import  {  View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, Image, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase/config"; 

import Posteo from "../components/message";

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: true,
      Posteo: []
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

      borrarPosteo(Posteo){
        db.collection('Posteo').doc(Posteo.id).delete()
        .then(() => {
                console.log("Se borro el posteo!");
            }).catch((error) => {
                console.error("No se pudo borrar ", error);
            });
        }

  render() {
    console.log(auth.currentUser) 
    return (
      <View style={styles.container}>
        <View>
           <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
           <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
           <Text style={styles.text}>Posteos hechos: { this.state.Posteo.length}</Text>
       </View>
       <View>
           <Text style={styles.text}>Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}</Text>
         

        <TouchableOpacity  style={styles.button}  onPress={() => this.props.route.params.logout()} >

           <Text style={styles.sign}> Cerrar sesión </Text>

         </TouchableOpacity>

         
        </View>

        <FlatList
          numColumns={2}
          horizontal={false}
          data={this.state.Posteo}
          keyExtractor={(Posteo) => Posteo.id.toString()}
          renderItem = { ({item}) => <View style={styles.container}>
            <Image source= {item.data.foto} style= {styles.img}/>
            <Text style={styles.text}> Descripcion: {item.data.description} </Text>
            <Text  style={styles.text}> Likes: {item.data.likes.length} </Text> 

            
            <TouchableOpacity
           style={styles.button2}
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


        /* <View>

      
                    {this.state.Posteo.length === 0 ?
                            <Text style={styles.text}>Todavia no hiciste ningun posteo</Text>
                            :
                    this.state.cargando ?
                            <ActivityIndicator size='small' color='blue' />
                            :
                            
                            
                            <FlatList
                                numColumns={2}
                                horizontal={false}
                                data={this.state.Posteo}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <Posteo info={item} navigation = {this.props.navigation} />}
                                
                                
                            />
                        }
                        
                    </View> */
        
              
       
      
      


const styles = StyleSheet.create({ 
  container: {
    flex:1,
   backgroundColor : "#40CFFF"
    

    
},
field: {
    
    backgroundColor: "black",
    color: '#ffffff',
},
button: {
   
    backgroundColor: "red",
    width: "80%",
    
   
},


sign: {
  
},
text:{

    color:'black'
  
},
button2:{
backgroundColor: "orange",
width: '80%',

},
img:{
  height: 500,
  width: "100%" 
}


})
