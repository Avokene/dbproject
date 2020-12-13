import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, ListItem, List, Left, Icon, Right
} from 'native-base';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IconI from 'react-native-vector-icons/Ionicons';
IconI.loadFont();

class MovieShow extends Component{
  constructor(props){
    super(props)
    this.state={
      rentList:[],
      movie_data:this.props.route.params.movie_data,
    }
  }

  onRent = async () => {
    if(this.state.rentList.length > 2) return Alert.alert('Fail')
    else{
      this.state.rentList.push(this.state.movie_data)
      AsyncStorage.setItem('rentList',JSON.stringify(this.state.rentList))
      Alert.alert('Success', `Sucessfully rented ${this.state.movie_data.movie_name}`);
    }
  }

  componentDidMount(){
    let temp = AsyncStorage.getItem('rentList');
    if(!temp)
      this.state.rentList = temp;
    console.log(this.state.rentList);
  }

  render(){
    return(
      <Container>
        <Header>
        <Left>
          <Button transparent onPress={()=>this.props.navigation.goBack()}>
            <Icon name='chevron-back'/>
          </Button>
        </Left>
          <Body>
            <Text>MovieShow</Text>
          </Body>
          <Right></Right>
        </Header>
        <List>
          <ListItem floatingLabel>
            <Text>{'id: '+this.state.movie_data.movie_id}</Text>
          </ListItem>
          <ListItem floatingLabel>
            <Text>{'name: '+this.state.movie_data.movie_name}</Text>
          </ListItem>
          <ListItem floatingLabel>
            <Text>{'genre: '+this.state.movie_data.genre}</Text>
          </ListItem>
          <ListItem floatingLabel>
            <Text>{'rating: '+this.state.movie_data.movie_rating}</Text>
          </ListItem>
          <Button 
            onPress={this.onRent}
            style={{alignSelf:'center', marginTop:'5%', width:'50%', justifyContent:'center'}}>
            <Text>
              Rent
            </Text>
          </Button>
        </List>
      </Container>
    )
  }
}
  
export default MovieShow;