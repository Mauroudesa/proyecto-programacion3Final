import React, { Component } from 'react';
import {View, Button, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {db} from '../firebase/config';
import Posteo from '../components/message';



class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos: [],
            search:'',
            buscando: false,
        };
    }


    todosLosPosteos(){
        
        db.collection ('Posteo'). where ('owner', '==', this.state.search).onSnapshot(
          docs => {
              let posts = [];
              docs.forEach( doc =>{
                  posts.push({
                      id:doc.id,
                      data:doc.data()
                  })
                  
              })
              this.setState({
                posteos: posts,
                buscando: true,
            })
          }  
        )
    }

    render(){
        return(

            <View style={styles.formContainer}>
                <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({search: text})}
                placeholder="buscar"
                keyboeardType="default"
                
               />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.todosLosPosteos()}
                >
                    <Text style={styles.textButton}>Buscar</Text>
                </TouchableOpacity>


            { this.state.buscando ? (
                this.state.posteos.length == 0 ? (
                    <Text style={styles.info}>mmm...no encontramos posteos con ese mail, proba con otro</Text>
                  ) : (
                      <Text style={styles.info}>Resultados para tu búsqueda: </Text>
                    )
            )
                 : (
                  null
                )
            }
<FlatList style={styles.posts}
         data={this.state.posteos}
         keyExtractor={item => item.id.toString()}
         renderItem={({ item }) => <Posteo info={item}  />}
         />
            

            </View>
        )
    }
}



const styles = StyleSheet.create({
    
    formContainer: {
        height: '100px',
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
       alignItems: 'center',
        width: "200px%",
        paddingHorizontal:10,
        marginTop: 20,
      },
    textInput:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        width: '50%'
    },
    info:{
    fontWeight: 'bold',
    display:"flex", 
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    paddingBottom: '2%',
    paddingTop: '2%',
    width: '100%'
    },
    button:{
        backgroundColor: '#3b8cde',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        backgroundColor: '#3b8cde',
        width: '50%'
    },
    posts:{
        width: '100%',
        height: 100
    }
})


export default Search