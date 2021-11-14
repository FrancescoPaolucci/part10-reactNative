import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SingleRepo from './singleRepo';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';
import SignUpForm from './SignupForm';
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: theme.fonts.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/list' exact>
          <RepositoryList />
        </Route>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path='/singlerepo/:id' exact>
          <SingleRepo />
        </Route>
        <Route path='/reviewform' exact>
          <ReviewForm />
        </Route>
        <Route path='/signupform' exact>
          <SignUpForm />
        </Route>
        <Route path='/myreviews' exact>
          <MyReviews />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;
