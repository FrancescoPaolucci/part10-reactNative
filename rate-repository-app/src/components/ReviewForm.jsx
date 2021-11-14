import React from 'react';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import useReview from '../hooks/useReview';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='repositoryName' placeholder='repositoryName' />
      <FormikTextInput name='ownerName' placeholder=' ownerName' />
      <FormikTextInput name='rating' placeholder=' rating' />
      <FormikTextInput name='text' placeholder=' text' />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text testID='submitButton' style={styles.text}>
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Owner name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
});

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const NewReview = () => {
  const [AddReview] = useReview();
  const history = useHistory();
  const onSubmit = async (values) => {
    const repositoryName = String(values.repositoryName);
    const ownerName = String(values.ownerName);
    const rating = values.rating;
    const text = String(values.text);
    console.log('U', repositoryName, 'P', ownerName, 'R', rating, 'T', text);
    try {
      const { data } = await AddReview({ repositoryName, ownerName, rating, text });
      console.log('DATAAAA', data);
      if (data.createReview.repository.id) {
        console.log('Data', data);
        history.push(`/singlerepo/${data.createReview.repository.id}`);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <View>
      <ReviewContainer onSubmit={onSubmit} />
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

export default NewReview;
