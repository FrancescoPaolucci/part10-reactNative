import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontFamily: theme.fonts.main,
  },
  signin: {
    backgroundColor: 'green',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to='/list'>
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.signin}>
          <Link to='/signin'>
            <Text style={styles.text}> SingIn</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
