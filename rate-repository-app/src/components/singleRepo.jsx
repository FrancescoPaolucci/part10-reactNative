import React from 'react';
import { useQuery } from '@apollo/client';
import Text from './Text';
import { View, Pressable, Linking, StyleSheet, FlatList } from 'react-native';
import { GET_REPO } from '../graphql/queries';
import theme from '../theme';
import Item from './RepositoryItem';
import { useParams } from 'react-router-native';
const RepositoryInfo = ({ item }) => {
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K' : Math.sign(num) * Math.abs(num);
  }
  return (
    <View>
      <Item fullName={item.fullName} description={item.description} language={item.language} forksCount={kFormatter(item.forksCount)} stargazersCount={kFormatter(item.stargazersCount)} ratingAverage={item.ratingAverage} reviewCount={item.reviewCount} ownerAvatarUrl={item.ownerAvatarUrl} id={item.id} />
      <Pressable style={styles.urlButton} onPress={() => Linking.openURL(item.url)}>
        Open Repository
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <View style={styles.flex} key={review.node.id}>
      <View style={styles.circle}>
        <Text style={styles.Text}>{review.node.rating}</Text>
      </View>
      <View style={styles.cont}>
        <Text style={{ paddingTop: 5 }}>{review.node.user.username}</Text>
        <Text style={{ paddingBottom: 10 }}>{new Date(review.node.createdAt).toLocaleDateString('en-US', options)}</Text>
        <Text>{review.node.text}</Text>
      </View>
    </View>
  );
};

const SingleRepo = () => {
  const ItemSeparator = () => <View style={styles.separator} />;
  const { id } = useParams();
  console.log('ID', id);
  let variables = { id: id, first: 10 };
  const { data, loading, fetchMore } = useQuery(GET_REPO, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const result = data?.repository;
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    console.log('fetchmoreReviewcalled', result.reviews.pageInfo.hasNextPage);
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  console.log('Single repo', result);
  if (loading || !result.reviews.edges)
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  console.log('EDGES', result.reviews.edges);
  const repo = result;
  const reviews = repo.reviews.edges;

  return (
    <View>
      <FlatList data={reviews} renderItem={({ item }) => <ReviewItem review={item} />} keyExtractor={(obj) => obj.node.id} ItemSeparatorComponent={ItemSeparator} ListHeaderComponent={() => <RepositoryInfo item={repo} />} onEndReached={handleFetchMore} />
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
});

export default SingleRepo;
