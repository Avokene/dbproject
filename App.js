import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './views/home';
import Login from './views/login';
import Registration from './views/registration';
import Movie from './views/movie';
import MovieShow from './views/MovieShow';
import Payment from './views/Payment';
import MyPage from './views/myPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyRentList from './views/myRentList';
import BestRating from './views/bestRating';

const Stack = createStackNavigator();

class App extends Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Home'>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
          <Stack.Screen name='Registration' component={Registration} options={{headerShown:false}}/>
          <Stack.Screen name='Movie' component={Movie} options={{headerShown:false}}/>
          <Stack.Screen name='MovieShow' component={MovieShow} options={{headerShown:false}}/>
          <Stack.Screen name='Payment' component={Payment} options={{headerShown:false}}/>
          <Stack.Screen name='MyPage' component={MyPage} options={{headerShown:false}}/>
          <Stack.Screen name='MyRentList' component={MyRentList} options={{headerShown:false}}/>
          <Stack.Screen name='BestRating' component={BestRating} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
