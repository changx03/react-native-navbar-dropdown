import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Home extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>This is content page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
