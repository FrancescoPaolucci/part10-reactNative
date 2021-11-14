import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Item from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K' : Math.sign(num) * Math.abs(num);
}

export const renderItem = ({ item }) => {
  return <Item fullName={item.fullName} description={item.description} language={item.language} forksCount={kFormatter(item.forksCount)} stargazersCount={kFormatter(item.stargazersCount)} ratingAverage={item.ratingAverage} reviewCount={item.reviewCount} ownerAvatarUrl={item.ownerAvatarUrl} id={item.id} />;
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return <FlatList data={repositoryNodes} ItemSeparatorComponent={ItemSeparator} keyExtractor={(item) => item.id} renderItem={renderItem} onEndReached={onEndReach} />;
};

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sort, setSort] = useState('latest');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [value] = useDebounce(searchQuery, 1000);
  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: sort,
    searchKeyword: value,
  });
  console.log(sort);
  console.log(searchQuery);
  const onEndReach = () => {
    fetchMore();
    console.log('end reached');
  };
  return (
    <View>
      <Searchbar placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} />
      <Picker selectedValue={sort} style={{ height: 50 }} mode={'dialog'} onValueChange={(itemValue) => setSort(itemValue)}>
        <Picker.Item label='Latest repos' value='latest' />
        <Picker.Item label='Highest rated repos' value='highest' />
        <Picker.Item label='Lowest rated repos' value='lowest' />
      </Picker>
      <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} />;
    </View>
  );
};

export default RepositoryList;
