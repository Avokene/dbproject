import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label
} from 'native-base';
class Registration extends Component{
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
            <Text>Registration</Text>
          </Body>
        </Header>
        <Form>
          <Item floatingLabel>
            <Label>email</Label>
            <Input onChangeText={(text)=>this.state.email=text}/>
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input onChangeText={(text)=>this.state.password=text}/>
          </Item>
          <Button 
            onPress={()=>{this.props.navigation.navigate('Home')}}
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