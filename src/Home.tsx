import * as React from 'react'
import { Button, StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import DropdownButton from './Dropdown'

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

function onDropdownRowPress(id: string | number) {
  /* global */
  Alert.alert('Alert', String(id))
}

export default class Home extends React.Component<NavigationScreenProps, {}> {
  static navigationOptions = {
    headerTitle: 'Dropdown menu',
    headerRight: <DropdownButton onRowPress={onDropdownRowPress} rowData={['Check Bluetooth', 'Software update']} />
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
