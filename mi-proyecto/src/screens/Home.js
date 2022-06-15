import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { db } from '../firebase/config';
import Posteo from "../components/message";
import { TextInput } from "react-native-gesture-handler";

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      info:[],
      loading:true,
      prueba:'',
      search:''
    }
  }
  componentDidMount(){
    db.collection('Posteo').orderBy("createdAt", "desc").onSnapshot(
        docs => {
            let postsAux = [] 
            docs.forEach( doc => {
                postsAux.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                info: postsAux
            })
        }
    )
}


  

  render(){
    return (
  
      <View style={styles.container}>
             
        <Text>Estos son los Posteos recientes:</Text>
       <FlatList
         data={this.state.info}
         keyExtractor={item => item.id.toString()}
         renderItem={({ item }) => <Posteo info={item}  navigation ={this.props.navigation}/>}
         />
      </View>
   
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:16,
    paddingBottom:32
  },
  btn:{
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'#192A51',
    paddingVertical:16,
    paddingHorizontal:8,
    marginHorizontal:'auto',
    marginBottom:16,
  },
  textBtn:{
    color:'white'
  }
})

export default Home