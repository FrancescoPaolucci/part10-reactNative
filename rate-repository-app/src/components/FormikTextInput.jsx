import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';
import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a',
    borderColor: '#d73a4a',
    borderRadius: 5,
    fontFamily: theme.fonts.main,
  },
  normal: {
    borderWidth: 2, // size/width of the border
    borderColor: 'black', // color of the border
    paddingLeft: 10,
    height: 75,
    backgroundColor: '#ffffff',
    paddingRight: 15,
  },
  error: {
    borderWidth: 6, // size/width of the border
    borderColor: 'red', // color of the border
    paddingLeft: 10,
    height: 75,
    backgroundColor: '#ffffff',
    paddingRight: 15,
  },
  view: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    height: 70,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={showError ? styles.error : styles.normal}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
