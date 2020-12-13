import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Payment extends Component{
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
          <Body>
            <Text>Payment</Text>
          </Body>
        </Header>
        <View style={{justifyContent:'center', alignItems:'center', flex:1, flexDirection:'row'}}>
          <Button 
            onPress={async()=>{await AsyncStorage.setItem('payment_method','unlimited'); this.props.navigation.goBack()}}
            style={{alignSelf:'center', margin:'5%', width:'40%', justifyContent:'center'}}>
            <Text>
              Unlimited
            </Text>
          </Button>
          <Button 
            onPress={async()=>{await AsyncStorage.setItem('payment_method','limited'); this.props.navigation.goBack()}}
            style={{alignSelf:'center', margin:'5%', width:'40%', justifyContent:'center'}}>
            <Text>
              Limited
            </Text>
          </Button>
        </View>
      </Container>
    )
  }
}
  
export default Payment;