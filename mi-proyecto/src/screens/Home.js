import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { db } from '../firebase/config';
import Posteo from "../components/message";


class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      Posteo:[],
      loading:true,
     
    }
  }
  componentDidMount(){
    db.collection('Posteo').orderBy("createdAt", "desc").onSnapshot(
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
                loading: false 
            })
        }
    )
}


  

  render(){
    console.log(this.state.Posteo)
    return (
     
      <View style={styles.container}>
             
        <Text>Nuevos Posts</Text>
        {
        this.state.loading ?
      
        <ActivityIndicator size='small' color='blue' />
        :
      
       <FlatList
         data={this.state.Posteo}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => <Posteo info={item} navigation = {this.props.navigation} />}
         />
          
        }
      </View>
   
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
   
  },
  btn:{
    
  },
  textBtn:{
    color:'white'
  }
})

export default Home