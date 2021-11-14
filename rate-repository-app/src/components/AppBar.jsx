import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import { useQuery, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import { GET_USER } from '../graphql/queries';

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
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push('/');
  };

  if (!data) {
    console.log('no data');
    return null;
  }
  if (data.authorizedUser) {
    console.log('Data', data.authorizedUser.username);
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <Pressable>
            <Link to='/list'>
              <Text style={styles.text}>Repositories</Text>
            </Link>
          </Pressable>
          <Pressable onPress={signOut} style={styles.signin}>
            <Text style={styles.text}> SingOut</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.text}> </Text>
          </Pressable>
          <Pressable>
            <Text style={styles.text}>{data.authorizedUser.username}</Text>
          </Pressable>
          <Text> </Text>
          <Pressable>
            <Link to='/reviewform'>
              <Text style={styles.text}> Add Your Review!</Text>
            </Link>
          </Pressable>
          <Text> </Text>
          <Pressable>
            <Link to='/myreviews'>
              <Text style={styles.text}>My Reviews</Text>
            </Link>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
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
        <Text> </Text>
        <Pressable>
          <Link to='/signupform'>
            <Text style={styles.text}> SignUp</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default AppBar;
