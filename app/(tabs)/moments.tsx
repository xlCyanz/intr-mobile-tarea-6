import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import CardImage from '@/components/card-image';

export default function MomentsScreen() {
  return (
    <View tw="container p-3 bg-transparent">
      <Text tw="text-md text-white mb-1" familyType="Regular">Haga clic en la imagen para ver los detalles.</Text>
      <ScrollView>
        <View tw="flex-row flex-wrap">
          {/* <CardImage title="Hora del Sandwich" source={require("../../assets/images/hora-sandwich.jpeg")} onPress={() => router.navigate("/sandwich")} /> */}
        </View>
        <View tw="flex-row flex-wrap">
          {/* <CardImage title="Insecto Bailarín" source={require("../../assets/images/insecto-bailarin.jpeg")} onPress={() => router.navigate("/insecto")} /> */}
        </View>
        <View tw="flex-row flex-wrap">
          {/* <CardImage title="Ricos Hot Cakes" source={require("../../assets/images/hot-cakes.jpeg")} onPress={() => router.navigate("/hot-cakes")} /> */}
        </View>
      </ScrollView>
    </View>
  );
}
