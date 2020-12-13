import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, ListItem, List, Left, Icon, Right
} from 'native-base';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rentList from '../rentList';

import IconI from 'react-native-vector-icons/Ionicons';
IconI.loadFont();

class MyRentList extends Component{

  renderList=()=>{
    return rentList.map(data=>{
      return(
        <ListItem key={data.movie_id}>
            <Left>
              <Text>
                {data.movie_id}
              </Text>
            </Left>
            <Body>
                <Text>
                  {data.movie_name}
                </Text>
                <Text style={{marginBottom:5}} note numberOfLines={1}>
                  {data.genre}
                </Text>
              </Body>
            <Right>
              <Text>{"Rating: "+data.movie_rating}</Text>
            </Right>
          </ListItem>
      )
    })
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
            <Text>Rent List</Text>
          </Body>
          <Right></Right>
        </Header>
        <List>
          {this.renderList()}
          <Button 
            onPress={()=>{rentList.pop(); this.forceUpdate()}}
            style={{alignSelf:'center', marginTop:'5%', width:'50%', justifyContent:'center'}}>
            <Text>
              Return All
            </Text>
          </Button>
        </List>
      </Container>
    )
  }
}
  
export default MyRentList;