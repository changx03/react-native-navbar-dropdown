import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class Home extends React.Component<NavigationScreenProps, {}> {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.container}>This is home page</Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <Button onPress={() => navigation.navigate('Content')} title="Content" />
          <View style={{ height: 10 }} />
          <Button onPress={() => navigation.navigate('About')} title="About" />
        </View>
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
  },
});
