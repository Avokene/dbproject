import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, Left, Icon, Right, List, ListItem
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
class MyPage extends Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:''
    }
  }

  render(){
    return(
      <Container>
        <Header>
        <Left>
        <Button transparent>
          <Icon name='chevron-back'></Icon>
          </Button>
        </Left>
          <Body>
            <Text>MyPage</Text>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Text>My info</Text>
          <List>
            
          </List>
          <Text>Payment</Text>
          <List>

          </List>
          <Text>Order</Text>
          <List>

          </List>
        </Content>
      </Container>
    )
  }
}
  
export default MyPage;