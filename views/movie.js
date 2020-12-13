import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, ListItem, List, Left, Right, FooterTab, Footer
} from 'native-base';
import { ThemeProvider } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
let flag = 0;
let notSearched = 0;
class Movie extends Component{
  constructor(props){
    super(props)
    this.state={
      search:'',
      movies:[],
      sMovies:[]
    }
  }

  getMovies(){
    fetch('http://localhost:4000/movies')
      .then(res=>res.json())
      .then(res=>{this.setState({movies:res.data})
        console.log(this.state.movies)
    })
      .catch(err=>console.log(err))
    
    flag = 1;
  }

  getSearchedMovies(){
    fetch(`http://localhost:4000/movies/search?text=${this.state.search}`)
      .then(res=>res.json())
      .then(res=>{this.setState({sMovies:res.data})
        console.log(this.state.sMovies)
    })
      .catch(err=>console.log(err))
    
    flag = 1;
  }

  onSearch=async()=>{
    console.log('pressed')
    console.log(this.state.movies)
    this.state.sMovies=[]
    this.getSearchedMovies()
    console.log("searched: "+this.state.sMovies)
    notSearched=1;
    this.setState({search:this.state.search})
  }

  renderResult=()=>{
    console.log(this.state.sMovies)
    if(this.state.sMovies==[]) notSearched = 0;
    if(notSearched==0){
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
    else{
      return this.state.sMovies.map(data=>{
        console.log("render-----------"+data)
        return(
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('MovieShow')}>
          <ListItem>
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
  }

  componentDidMount(){
    if(flag==0)
      this.getMovies();
  }

  render(){
    return(
      <Container>
        <Header>
          <Body>
            <Text>Movies</Text>
          </Body>
        </Header>
        <View style={{width:'100%' ,height:'5%', justifyContent:'center', flexDirection:'row'}}>
          <Input
            placeholder='search'
            onChangeText={(text)=>this.state.search=text}
            style={{borderColor:'#000', backgroundColor:'#e8e8e8'}}
          />
        </View>
          <Button 
            onPress={()=>this.onSearch()}
            style={{alignSelf:'center', marginTop:'5%', width:'30%', justifyContent:'center'}}>
            <Text>
              Search
            </Text>
          </Button>
        <Content>
          <List>
            {this.renderResult()}
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={()=>this.props.navigation.navigate('Payment')}>
              <Text>Payment</Text>
            </Button>
            <Button>
              <Text>
                Best Rating
              </Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate('MyPage')}>
              <Text>
                My Page
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
  
export default Movie;