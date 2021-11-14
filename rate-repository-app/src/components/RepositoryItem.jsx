import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import theme from '../theme';
import { useHistory } from 'react-router-native';
const Item = ({ fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount, ownerAvatarUrl, id }) => {
  const history = useHistory();

  return (
    <Pressable onPress={() => history.push(`/singlerepo/${id}`)}>
      <View style={styles.item}>
        <View>
          <Image
            style={styles.profilepic}
            source={{
              uri: ownerAvatarUrl,
            }}
          />
          <Text style={styles.name} testID='fullName'>
            {fullName}{' '}
          </Text>
        </View>
        <Text testID='description'>{description} </Text>
        <Text style={styles.language} testID='language'>
          {language}{' '}
        </Text>
        <Text testID='forksCount'>forks:{forksCount} </Text>
        <Text testID='stargazersCount'>Stars:{stargazersCount} </Text>
        <Text testID='reviewCount'>review:{reviewCount} </Text>
        <Text testID='ratingAverage'>reting:{ratingAverage} </Text>
      </View>
    </Pressable>
  );
};
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
