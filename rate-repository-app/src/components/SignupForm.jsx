import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const SignupForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='username' />
      <FormikTextInput secureTextEntry={true} name='password' placeholder='password' />
      <FormikTextInput secureTextEntry={true} name='passwordConfirm' placeholder='password' />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text testID='submitButton' style={styles.text}>
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username required').min(1, ' Min length  1!').max(30, 'Max Length 30!'),
  password: yup.string().required('Password required').min(5, 'Min length 5!').max(30, ' Max Length  30!'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignUpForm = () => {
  const [register] = useSignUp();
  const history = useHistory();
  const onSubmit = async (values) => {
    const username = String(values.username);
    const password = String(values.password);
    console.log('U', username, 'P', password);
    try {
      await register({ username, password });
      history.push('/list');
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <View>
      <SignUpContainer onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    padding: 10,
    margin: 10,
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
export default SignUpForm;
