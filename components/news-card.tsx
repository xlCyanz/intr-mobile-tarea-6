import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Text, View, useThemeColor } from './themed';

interface INewsCardProps {
  title: string;
  imageSource: string;
  description: string;
  onPress?: () => void;
}

const NewsCard = ({ imageSource, title, description, onPress }: INewsCardProps) => {
  const tint = useThemeColor({}, "tint")

  return (
    <View tw="rounded-lg mb-5" style={styles.card}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View tw="p-3">
        <Text tw="text-base mb-1" familyType="Bold">{title}</Text>
        <Text numberOfLines={3} tw="text-sm">{description}</Text>
        <Text
          tw="text-base mt-2 touch-auto"
          style={{ color: tint }}
          familyType="SemiBold"
          onPress={onPress}
        >
          Leer mas {">>"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default NewsCard;
