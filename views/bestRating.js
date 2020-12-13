import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, ListItem, List, Left, Right, FooterTab, Footer, Icon
} from 'native-base';
import {ActionSheetIOS} from 'react-native'
import { ThemeProvider } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
class Movie extends Component{
  constructor(props){
    super(props)
    this.state={
      search:'',
      movies:[],
      myID:this.props.route.params.myID,
      actor_id:'',
      movie_id:'',
      genre:'',
    }
  }

  getMovie=()=>{
    fetch('http://localhost:4000/movie/rating')
      .then(res=>res.json())
      .then(res=>{this.setState({movies:res.data})
        console.log(this.state.movies)
    })
      .catch(err=>console.log(err))
    this.forceUpdate()
  }

  renderResult=()=>{
    console.log(this.state.sMovies)
    console.log('something')
    return this.state.movies.map(data=>{
      console.log("not searched -- "+data)
      return(
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MovieShow',{movie_data:data})}>
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
        </TouchableOpacity>
      )
    })
    
  }

  componentDidMount(){
    this.getMovie();
  }

  render(){
    return(
      <Container>
        <Header>
        <Left style={{flex:1}}>
          <Button transparent onPress={()=>this.props.navigation.goBack()}>
            <Icon name='chevron-back'></Icon>
          </Button>
        </Left>
          <Body style={{flex:10}}>
            <Text>Best Rated Movies</Text>
          </Body>
        </Header>
        <Content>
          <List>
            {this.renderResult()}
          </List>
        </Content>
      </Container>
    )
  }
}
  
export default Movie;