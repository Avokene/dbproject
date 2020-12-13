import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, Left, Icon, Right, List, ListItem
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
class MyPage extends Component{
  constructor(props){
    super(props)
    this.state={
      myID:this.props.route.params.myID,
      myInfo:{},
      paymentInfo:{},
      orderInfo:{},
    }
  }

  getInfo=()=>{
    fetch(`http://localhost:4000/user/info?user_id=${this.state.myID}`)
      .then(res=>res.json())
      .then((res)=>{this.setState({myInfo:res.data[0]})
    })
      .catch(err=>console.log(err));
    console.log("myid blah blah   "+this.state.myID)
    
    fetch(`http://localhost:4000/payment?user_id=${this.state.myID}`)
      .then(res=>res.json())
      .then((res)=>{this.setState({paymentInfo:res.data[0]})
        this.getOrderInfo()
      })
      .catch(err=>console.log(err))
  }

  getOrderInfo=()=>{
    fetch(`http://localhost:4000/order/info?payment_id=${this.state.paymentInfo.payment_id}`)
      .then(res=>res.json())
      .then((res)=>{this.setState({orderInfo:res.data[0]})
    })
      .catch(err=>console.log(err));
  }

  componentDidMount(){
    this.getInfo();
  }

  renderMyInfo=()=>{
    return(
      <ListItem>
        <Left>
          <Text>{this.state.myInfo.user_id}</Text>
        </Left>
        <Body>
          <Text>{this.state.myInfo.user_fname+this.state.myInfo.user_lname}</Text>
          <Text>{this.state.myInfo.user_address}</Text>
        </Body>

      </ListItem>
    )
  }

  renderPaymentInfo=()=>{
    return(
      <ListItem>
        <Left>
          <Text>{this.state.paymentInfo.payment_id}</Text>
        </Left>
        <Body>
          <Text>{this.state.paymentInfo.payment_type}</Text>
        </Body>

      </ListItem>
    )
  }

  renderOrderInfo=()=>{
    return(
      <ListItem>
        <Left>
          <Text>{this.state.orderInfo.order_id}</Text>
        </Left>
        <Body>
          <Text>{this.state.orderInfo.order_date}</Text>
          <Text>{this.state.orderInfo.return_date}</Text>
        </Body>
        <Right>
          <Text>{'movie: id '+this.state.orderInfo.Movie_movie_id}</Text>
        </Right>

      </ListItem>
    )
  }

  render(){
    return(
      <Container>
        <Header>
        <Left>
        <Button transparent onPress={()=>this.props.navigation.goBack()}>
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
            {this.renderMyInfo()}
          </List>
          <Text>Payment</Text>
          <List>
            {this.renderPaymentInfo()}
          </List>
          <Text>Order</Text>
          <List>
            {this.renderOrderInfo()}
          </List>
        </Content>
      </Container>
    )
  }
}
  
export default MyPage;