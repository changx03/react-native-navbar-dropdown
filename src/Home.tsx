import * as React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import HamburgerButton from './Dropdown'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})

export default class Home extends React.Component<NavigationScreenProps, {}> {
  static navigationOptions = {
    headerTitle: 'Dropdown menu',
    headerRight: <HamburgerButton onRowClick={() => {}} rowData={['Option 1', 'Option 2', 'Option 3']} />
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate('Content')} title="Content" />
        <View style={{ height: 20 }} />
        <Button onPress={() => navigation.navigate('About')} title="About" />
      </View>
    )
  }
}
