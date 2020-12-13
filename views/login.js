import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      myID:'',
    }
  }

  checkLogin=async()=>{
    if(this.state.email=='') {
      Alert.alert('Login Fail','No email')
    }
    else{
      await fetch(`http://localhost:4000/user/logins?email=${this.state.email}`)
        .then(res=>res.json())
        .then(async(res)=>{
          console.log('res -- '+ JSON.stringify(res))
          this.setState({myID:res.data[0].user_id})
          console.log(this.state.myID)
          await AsyncStorage.setItem('myID', this.state.myID)
        })
        .then(async(res)=>this.props.navigation.navigate('Movie', {myID:this.state.myID}))
        .catch(err=>console.log(err))
    }
  }

  render(){
    return(
      <Container>
        <Header>
          <Body>
            <Text>Login</Text>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>email</Label>
            <Input autoCapitalize='none' onChangeText={(text)=>{this.state.email=text; console.log(this.state.email)}}/>
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input onChangeText={(text)=>{this.state.password=text}}/>
          </Item>
          <Button 
            onPress={()=>this.checkLogin()}
            style={{alignSelf:'center', marginTop:'5%', width:'50%', justifyContent:'center'}}>
            <Text>
              Login
            </Text>
          </Button>
        </Form>
      </Container>
    )
  }
}
  
export default Login;