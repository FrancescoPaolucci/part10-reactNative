import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
const initialValues = {
  username: '',
  password: '',
};
const SignInform = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='username' />
      <FormikTextInput
        secureTextEntry={true}
        name='password'
        placeholder='password'
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(validationSchema);
    const username = values.username;
    const password = values.password;
    console.log('U', username, 'P', password);
  };
  return (
    <View>
      <Text>The sign in view</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInform onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: theme.fonts.main,
  },
});
export default SignIn;
