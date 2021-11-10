import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Item from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K' : Math.sign(num) * Math.abs(num);
}

const renderItem = ({ item }) => <Item fullName={item.fullName} description={item.description} language={item.language} forksCount={kFormatter(item.forksCount)} stargazersCount={kFormatter(item.stargazersCount)} ratingAverage={item.ratingAverage} reviewCount={item.reviewCount} ownerAvatarUrl={item.ownerAvatarUrl} />;

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const repositories = useRepositories();

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
  console.log(repositoryNodes);

  return <FlatList data={repositoryNodes} ItemSeparatorComponent={ItemSeparator} keyExtractor={(item) => item.id} renderItem={renderItem} />;
};

export default RepositoryList;
