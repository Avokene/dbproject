import React, {Component} from 'react'
import {Container, Header, Content, Text, Button, View, Body, Form, Item,
  Input, Label, ListItem, List, Left, Right, FooterTab, Footer
} from 'native-base';
import {ActionSheetIOS} from 'react-native'
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
      sMovies:[],
      myID:this.props.route.params.myID,
      actor_id:'',
      movie_id:[],
      genre:'',
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

  onSearchActor=()=>{
    console.log('pressed')
    this.state.sMovies=[]
    fetch(`http://localhost:4000/movie/actor?name=${this.state.search}`)
      .then(res=>res.json())
      .then(res=>{this.setState({actor_id:res.data[0].actor_id})
        console.log(this.state.actor_id)
        this.onSearchMovieID();
        this.setState({search:this.state.search});
      })
      .catch(err=>console.log(err))
  }

  onSearchMovieID=()=>{
    fetch(`http://localhost:4000/movie/actor/search?actor_id=${this.state.actor_id}`)
      .then(res=>res.json())
      .then((res)=>{this.setState({movie_id:res.data})
        console.log(this.state.movie_id)
        this.onSearchMovieInfo();
      })
      .catch(err=>console.log(err))
  }

  onSearchMovieInfo=async()=>{
    this.state.sMovies=[]
    this.state.movie_id.map(data=>{
      fetch(`http://localhost:4000/movie/actor/search/name?movie_id=${data.Movie_movie_id}`)
      .then(res=>res.json())
      .then((res)=>{
        this.state.sMovies.push(res.data[0])
        console.log(this.state.sMovies)
        this.forceUpdate()
      })
      .catch(err=>console.log(err))
    })

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
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('MovieShow',{movie_data:data})}>
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

  onAction=()=>{
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Drama", "Comedy"],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          this.state.genre='Drama';
          this.afterAction();
        } else if (buttonIndex === 2) {
          this.state.genre='Comedy'
          this.afterAction();
        }
      }
    );
  }

  afterAction=()=>{
    fetch(`http://localhost:4000/movie/genre?genre=${this.state.genre}`)
      .then(res=>res.json())
      .then((res)=>{this.setState({sMovies:res.data})
        console.log(this.state.sMovies)
        this.forceUpdate()
      })
      .catch(err=>console.log(err))
  }

  componentDidMount(){
    if(flag==0)
      this.getMovies();
  }

  render(){
    return(
      <Container>
        <Header>
        <Left>
          <Button transparent onPress={()=>this.onAction()}>
            <Text>Genre</Text>
          </Button>
        </Left>
          <Body>
            <Text>Movies</Text>
          </Body>
          <Right>
            <Button transparent onPress={()=>this.props.navigation.navigate('MyRentList')}>
              <Text>List</Text>
            </Button>
          </Right>
        </Header>
        <View style={{width:'100%' ,height:'5%', justifyContent:'center', flexDirection:'row'}}>
          <Input
            placeholder='search'
            onChangeText={(text)=>this.state.search=text}
            style={{borderColor:'#000', backgroundColor:'#e8e8e8'}}
          />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', width:'100%'}}>
          <Button 
            onPress={()=>this.onSearch()}
            style={{alignSelf:'center', margin:'5%', width:'40%', justifyContent:'center'}}>
            <Text>
              Search by Movie
            </Text>
          </Button>

          <Button 
            onPress={()=>this.onSearchActor()}
            style={{alignSelf:'center', margin:'5%', width:'40%', justifyContent:'center'}}>
            <Text>
              Search by Actor
            </Text>
          </Button>
        </View>
        <Content>
          <List>
            {this.renderResult()}
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={()=>this.props.navigation.navigate('Payment',{myID:this.state.myID})}>
              <Text>Payment</Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate('BestRating',{myID:this.state.myID})}>
              <Text>
                Best Rating
              </Text>
            </Button>
            <Button onPress={()=>this.props.navigation.navigate('MyPage', {myID:this.state.myID})}>
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