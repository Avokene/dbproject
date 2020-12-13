import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View} from 'native-base';
class Home extends Component{
    render(){
      return(
        <Container>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:50, fontWeight:'100', padding:'4%', margin:'4%'}}>Movie Demo</Text>
            <Button 
              onPress={()=>{this.props.navigation.navigate('Login')}}
              style={{alignSelf:'center', marginTop:'5%', width:'50%', justifyContent:'center'}}>
              <Text>
                Login
              </Text>
            </Button>
            <Button 
              onPress={()=>{this.props.navigation.navigate('Registration')}}
              style={{alignSelf:'center', marginTop:'5%', width:'50%', justifyContent:'center'}}>
              <Text >
                Registration
              </Text>
            </Button>
          </View> 
        </Container>
      )
    }
  }
  
  export default Home;