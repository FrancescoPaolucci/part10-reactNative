import React from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, Alert } from 'react-native';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const history = useHistory();
  const onDeleteReview = async (id) => {
    await deleteReview({ variables: { id } });
    refetch();
  };
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <View style={styles.flex} key={review.id}>
      <View style={styles.circle}>
        <Text style={styles.Text}>{review.rating}</Text>
      </View>
      <View style={styles.cont}>
        <Text style={{ paddingTop: 5 }}>{review.repository.id}</Text>
        <Text style={{ paddingBottom: 10 }}>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</Text>
        <Text>{review.text}</Text>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => history.push(`singlerepo/${review.repository.id}`)}>
          <View>
            <Text>View repository</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.button2}
          onPress={() =>
            Alert.alert('Delete the review ?', 'pressing OK will delete your review', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => onDeleteReview(review.id),
              },
            ])
          }
        >
          <View>
            <Text>Delete review</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { id: id, includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (!data) {
    history.push('/');
    return null;
  }
  const reviews = data ? data.authorizedUser.reviews.edges.map((edge) => edge.node) : [];

  return (
    <View>
      <FlatList data={reviews} renderItem={({ item }) => <ReviewItem review={item} />} keyExtractor={(obj) => obj.id} ItemSeparatorComponent={ItemSeparator} refetch={refetch} />
    </View>
  );
};

const styles = StyleSheet.create({
  urlButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
  circle: {
    resizeMode: 'stretch',
    width: 50,
    height: 50,
    margin: 10,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    justifyContent: 'center',
    borderRadius: 25,
  },
  separator: {
    height: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  flex: {
    flex: 2,
    flexDirection: 'row',
  },
  Text: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontFamily: theme.fonts.main,
  },
  cont: {
    flex: 1,
    marginVertical: 10,
    flexGrow: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: theme.colors.primary,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
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

export default MyReviews;
