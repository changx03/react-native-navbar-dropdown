import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import AboutScreen from './About'
import ContentScreen from './Content'
import HomeScreen from './Home'

const RootStack = createStackNavigator({
  Home: { screen: HomeScreen },
  About: { screen: AboutScreen },
  Content: { screen: ContentScreen }
})

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
