import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import theme from '../theme';
const Item = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) => (
  <View style={styles.item}>
    <View>
      <Image
        style={styles.profilepic}
        source={{
          uri: ownerAvatarUrl,
        }}
      />
      <Text style={styles.name}>{fullName} </Text>
    </View>
    <Text>{description} </Text>
    <Text style={styles.language}>{language} </Text>
    <Text>forks:{forksCount} </Text>
    <Text>Stars:{stargazersCount} </Text>
    <Text>review:{reviewCount} </Text>
    <Text>reting:{ratingAverage} </Text>
  </View>
);
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#0000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  profilepic: { width: 66, height: 58 },
  name: { fontWeight: 'bold' },
  language: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    color: 'white',
    fontFamily: theme.fonts.main,
  },
});

export default Item;
