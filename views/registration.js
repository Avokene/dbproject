import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
class Registration extends Component{
  constructor(props){
    super(props)
    this.state={
      fname:'',
      lname:'',
      email:'',
      password:'',
      address:'',

    }
  }
  onRegistration=async()=>{
    let user_id = await AsyncStorage.getItem('user_id')
    console.log(user_id)
    let userID=user_id+user_id+user_id+'-'+user_id+user_id+'-'+user_id+user_id+user_id+user_id
    if(this.state.fname=='') Alert.alert('Registration Fail','Check your first name please')
    else{
      console.log('pressed')
      fetch(`http://localhost:4000/user/add?user_id=${userID}&user_fname=${this.state.fname}&user_lname=${this.state.lname}&user_email=${this.state.email}&user_password=${this.state.password}&user_address=${this.state.address}`)
        .then(res=>res.json())
        .then(async res=>{
          console.log(res)
          user_id=Number(user_id)+1
          await AsyncStorage.setItem('user_id',String(user_id))
          Alert.alert('Welcome','Please Login in Home Screen')
          this.props.navigation.navigate('Home')
        })
        .catch(err=>console.log(err))
      }
  }

  render(){
    return(
      <Container>
        <Header>
          <Body>
            <Text>Registration</Text>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>fname</Label>
            <Input onChangeText={(text)=>this.state.fname=text}/>
          </Item>
          <Item floatingLabel>
            <Label>lname</Label>
            <Input onChangeText={(text)=>this.state.lname=text}/>
          </Item>
          <Item floatingLabel>
            <Label>email</Label>
            <Input autoCapitalize='none' onChangeText={(text)=>this.state.email=text}/>
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input autoCapitalize='none' secureTextEntry={true} onChangeText={(text)=>this.state.password=text}/>
          </Item>
          <Item floatingLabel>
            <Label>address</Label>
            <Input onChangeText={(text)=>this.state.address=text}/>
          </Item>
          <Button 
            onPress={()=>this.onRegistration()}
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
  
export default Registration;